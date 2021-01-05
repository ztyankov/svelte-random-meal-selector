import type { CuisineTypesEnum } from "./cuisine.enum";
import type { IIngredient } from "./ingredient.interface";
import type { MealTypeEnum } from "./mealType.enum";
import type { ISpice } from "./spice.interface";

export interface IMeal {
    id: number;
    name: string;
    cuisine: CuisineTypesEnum;
    ingredients: IIngredient[];
    spices: ISpice[];
    type: MealTypeEnum[];
    tags: string[];
    cookingTime: {
        min: number,
        max: number
    };
}