import Fetch from "./fetch";

const fetch = new Fetch({
    base_url: 'https://api.edamam.com',
    app_id: '48be923d',
    app_key: '33d33a473a5d18d4a291cdb6e7a6ec39',
  });


export const get_recipes = async (
    search_query: string,
  ) => await fetch.makeRequest(`/search?q=${search_query}`);