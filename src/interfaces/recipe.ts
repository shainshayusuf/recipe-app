 export interface RecipeIngredient {
    text: string;
    quantity: number;
    measure: string | null;
    food: string;
    weight: number;
    foodCategory: string;
    foodId: string;
    image: string;
}
 export interface Recipe {
    uri: string;
    label: string;
    image: string;
    source: string;
    url: string;
    shareAs: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: RecipeIngredient[];
    calories: number;
    totalWeight: number;
    totalTime: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
}

export interface Favourite {
    name : string;
    url : string;
}

export interface RecipeResponse {
    recipe: Recipe;
}

export interface RecipeApiResponse {
    hits : RecipeResponse[],
    count : number,
    from : number,
    to : number,
    more : boolean
}
