import { useState } from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinkIcon from '@material-ui/icons/Link';
import { Tooltip } from "@material-ui/core";

import { Favourite, Recipe, RecipeIngredient } from "../../interfaces";
import Modal from "../../common/Modal";

import "./style.css";

export default function RecipeCard({ recipe , toggleFavourites }:
   { recipe: Recipe , toggleFavourites : (favourite : Favourite , isFavorite : boolean) => void }) {
  const { label, image, healthLabels, url, ingredients } = recipe;

  const [isFavorite, setFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleFavorite = () => {
    toggleFavourites({name : label , url} , !isFavorite);
    setFavorite(!isFavorite);
  };

  return (
    <div className={`recipe-card ${isFavorite ? 'favorite' : ''}`}>
      <div className="recipe-label-info"> <img src={image} alt={label} />
        <div className="recipe-action">
          <div className="recipe-details-wrapper">
            <Tooltip title={label}>
              <h3 className="recipe-details">{label}</h3>
            </Tooltip>
          </div>
          <div className="recipe-icons">
            <FavoriteIcon style={{ color: isFavorite ? '#f39c12' : 'gray', cursor: 'pointer' }} onClick={toggleFavorite} />
            <VisibilityIcon style={{ color: 'gray', cursor: 'pointer' }} fontSize="default" onClick={() => setShowModal(true)} />
            <LinkIcon style={{ color: 'gray', cursor: 'pointer' }} fontSize="default" onClick={() => window.open(url)} />
          </div>
        </div>
      </div>
      <div>
        {healthLabels && (
          <div className="health-labels">
            <strong>Health Labels:</strong>
            {healthLabels.map((label: string, index: number) => (
              <span key={index}> {label} {index !== healthLabels.length - 1 && '*'}</span>
            ))}
          </div>
        )}
      </div>
     {showModal &&  <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        title="Recipe Details">
        <h3>Ingredients:</h3>
        {ingredients.map((ingredient: RecipeIngredient, index: number) => (
          <div key={index} className="ingredient">
            <img src={ingredient.image} alt={ingredient.food} />
            <div className="ingredient-info">
              <p>{ingredient.text}</p>
              <p>{ingredient.measure}</p>
            </div>
            <div className="ingredient-measure">
              <p>Quantity: {ingredient.quantity.toFixed(2)}</p>
              <p>Weight: {ingredient.weight.toFixed(2)}</p> {/* Format weight to two decimal places */}
            </div>
          </div>
        ))}
      </Modal>}
    </div>
  );
};

