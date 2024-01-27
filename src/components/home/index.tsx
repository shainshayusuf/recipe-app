import { useState, useEffect } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

import RecipeCard from "../recipe-tile";
import Spinner from "../../common/Spinner";

import { get_recipes } from "../../api/recipe";

import "./style.css";



const ITEM_HEIGHT = 48;

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipeData, setRecipeData] = useState([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [noResults, setNoResults] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setHasInteracted(true);
    };

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            if (!searchQuery || !hasInteracted) {
                return;
            }

            const data = await get_recipes(searchQuery);

            if (data.hits && data.hits.length > 0) {
                setRecipeData(data.hits);
                setNoResults(false);
            } else {
                setRecipeData([]);
                setNoResults(true);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchRecipes();
    };

    useEffect(() => {
        if (!searchQuery) {
            setRecipeData([]);
            setNoResults(false);
        }
    }, [searchQuery]);

    const handleFavourites = (label: any, isFavourite: boolean) => {
        if (isFavourite) {
            setFavorites([...favorites, label]);
        }
        else {
            setFavorites(favorites.filter((fav: any) => fav.name !== label.name));
        }
    }

    //For handling the favorites menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {loading && <Spinner />}
            <h1 onClick={fetchRecipes}> Recipe Corner 🍔</h1>
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    className="text-input"
                    type="text"
                    placeholder="Enter Ingredient or dish name"
                    autoComplete="Off"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                />
                <input className="submit-button" type="submit" value="Search" />
            </form>

            <div className="favourite-icon-home">
                <IconButton
                    onClick={handleClick}
                    disabled={favorites.length === 0}
                >
                    <Badge badgeContent={favorites.length} color="secondary">
                        <FavoriteIcon />
                    </Badge>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {favorites.map((option) => (
                        <MenuItem key={option.name} onClick={() => window.open(option.url)}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            <div>
                {(!searchQuery && hasInteracted) ? (
                    <p>Start typing in the search bar to find delicious recipes!</p>
                ) : noResults ? (
                    <p>No results found for "{searchQuery}". Please try a different search.</p>
                ) : (
                    recipeData.length > 0 && <div className="recipe-list-container">
                        {recipeData.map((recipe: any, index: number) => <RecipeCard key={index} recipe={recipe.recipe} toggleFavourites={(recipe: any, isFavorite: any) => handleFavourites(recipe, isFavorite)} />)}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
