import { useState, useEffect } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

import RecipeCard from "../recipe-tile";
import Spinner from "../../common/Spinner";

import { Favourite, RecipeResponse } from "../../interfaces";
import { get_recipes } from "../../api/recipe";

import "./style.css";

function Home() {
    // State variables
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [recipeData, setRecipeData] = useState<RecipeResponse[]>([]);
    const [favorites, setFavorites] = useState<Favourite[]>([]);
    const [loading, setLoading] = useState(false);

    // To handle changes in the search input
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // To fetch recipes based on search query after form submission
    const fetchRecipes = async () => {
        setLoading(true);
        try {
            if (!searchQuery) {
                return;
            }

            const data = await get_recipes(searchQuery);

            if (data.hits && data.hits.length > 0) {
                setRecipeData(data.hits);
            } else {
                setRecipeData([]);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
        finally {
            setLoading(false);
        }
    };

    // To handle form submission
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchRecipes();
    };

    useEffect(() => {
        // Clear recipe data when search query is empty
        if (!searchQuery) {
            setRecipeData([]);
        }
    }, [searchQuery]);

    // To handle favorites
    const handleFavourites = (label: Favourite, isFavourite: boolean) => {
        if (isFavourite) {
            setFavorites([...favorites, label]);
        }
        else {
            setFavorites(favorites.filter((fav: Favourite) => fav.name !== label.name));
        }
    }

    // To handle favorites menu
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(undefined);
    };

    return (
        <>
            {loading && <Spinner />} {/* Display spinner while loading */}
            <h1 onClick={fetchRecipes}> Recipe Corner 🍔</h1> {/* Clicking title fetches recipes */}
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

            {/* Favorites icon and menu */}
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
                {/* Display instructions or results based on search */}
                {(!searchQuery ) ? (
                    <p>Start typing in the search bar to find delicious recipes!</p>
                ) : searchQuery && recipeData.length === 0 ? (
                    <p>No results found for "{searchQuery}". Please try a different search.</p>
                ) : (
                    recipeData.length > 0 && <div className="recipe-list-container">
                        {recipeData.map((recipe: RecipeResponse, index: number) => <RecipeCard key={index} recipe={recipe.recipe} toggleFavourites={(favourite: Favourite, isFavorite: boolean) => handleFavourites(favourite, isFavorite)} />)}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
