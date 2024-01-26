import { useState } from "react";
import "./style.css";


import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinkIcon from '@material-ui/icons/Link';
import Modal from "../../common/Modal";



export default function RecipeList({ recipe }: { recipe: any }) {
  return (
    recipe["recipe"]["image"] && (
     <RecipeCard recipe={recipe["recipe"]} />
    )
  );
}



const RecipeListCard = ({ recipe }: { recipe: any }) => {
  const [isFavorite, setFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!isFavorite);
  };

  return (
    <div 
    className={`recipe-card ${isFavorite ? 'favorite' : ''}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <img src={recipe.image} alt={recipe.label} className="recipe-image" />
      <div className="recipe-details">
        <h2 className="recipe-title">{recipe.label}</h2>
        <p className="recipe-description">{recipe.description}</p>
        <p className="recipe-url">
          <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            View Recipe
          </a>
        </p>
        {/* {isHovered && (
          <button className="favorite-button" onClick={toggleFavorite}> */}
            <FavoriteIcon style={{color : isFavorite ? '#f39c12' : 'gray'}} onClick={toggleFavorite} />
            {/* <FontAwesomeIcon icon={faHeart} color={isFavorite ? 'red' : 'gray'} />
          </button>
        )} */}
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const { label, image, healthLabels, url } = recipe;

  const [isFavorite, setFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!isFavorite);
  };

  return (
    <div className={`recipe-card ${isFavorite ? 'favorite' : ''}`}>
      <div className="recipe-label-info"> <img src={image} alt={label} />
       <div className="recipe-action">
       <div className="recipe-details">
          <h3>{label}</h3>
        </div>
        <div className="recipe-icons">
        <FavoriteIcon style={{color : isFavorite ? '#f39c12' : 'gray' , cursor :'pointer'}} onClick={toggleFavorite} />
        <VisibilityIcon style={{color : 'gray' , cursor :'pointer'}} fontSize="default" onClick={() => setShowModal(true)} /> 
        <LinkIcon style={{color : 'gray' , cursor :'pointer'}} fontSize="default" onClick={() => window.open(url)} />
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
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}/>
    </div>
  );
};

