enum CousinTypesEnum {
    ITALIAN = "Italian",
    AMERICAN = "American",
}

interface IIngredient {
    id: number;
    name: string;
}

interface ISpice {
    id: number;
    name: string;
}

export interface IMeal {
    id: number;
    name: string;
    cousin: CousinTypesEnum;
    ingredients: IIngredient[];
    spices: ISpice[];
    tags: string[];
    cookingTime: number;
}