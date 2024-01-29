import { RecipeApiResponse } from "../interfaces";
import Fetch from "./fetch";

const fetch = new Fetch({
    base_url: process.env.REACT_APP_EDAMAM__BASE_URL,
    app_id: process.env.REACT_APP_EDAMAM_APP_ID,
    app_key: process.env.REACT_APP_EDAMAM__APP_KEY,
  });


export const get_recipes = async (
    search_query: string,
  ) : Promise<RecipeApiResponse> => await fetch.makeRequest(`/search?q=${search_query}`);