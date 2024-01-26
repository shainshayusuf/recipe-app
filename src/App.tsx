// import Axios from "axios";
import { useState , useEffect } from "react";
import "./app.css";
import RecipeTile from "./components/recipe-tile";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeData, setRecipeData] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setHasInteracted(true);
    };

  const fetchRecipes = async () => {
    try {
      if (!searchQuery || !hasInteracted) {
        // If searchQuery is empty or user hasn't interacted, do nothing
        return;
      }

      // Fetch data from Edamam API based on searchQuery
      // This is a simplified example, replace it with your actual API call
      const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=48be923d&app_key=33d33a473a5d18d4a291cdb6e7a6ec39`);
      const data = await response.json();

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
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior
    fetchRecipes();
  };

  return (
    <div className="app">
      <h1 onClick={fetchRecipes}>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={handleSearchSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="Enter Ingredient"
          autoComplete="Off"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e)}
        />
        <input className="app__submit" type="submit" value="Search" />
      </form>

      <div className="recipe-list-container">
      {(!searchQuery && hasInteracted) ? (
        <p>Start typing in the search bar to find delicious recipes!</p>
      ) : noResults ? (
        <p>No results found for "{searchQuery}". Please try a different search.</p>
      ) : (
        recipeData.length > 0 && recipeData.map((recipe) => <RecipeTile recipe={recipe} />)
      )}
      </div>
    </div>
  );
}

export default App;
