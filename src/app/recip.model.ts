import { Category } from "./category.model";

export class Recipe {
    
    code : number;
    name : string;
    picture_Recipe:string;
    preparation_time:number;
    level_of_difficulty:number;
    category :Category
    products:string[]
    code_Chef:number;
    instructions:string[];
}