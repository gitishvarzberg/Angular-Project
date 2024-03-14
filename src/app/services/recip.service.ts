import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recip.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class RecipService {
  constructor(private http: HttpClient) { }
  static code:number=100
  recipe:Recipe
  public getRecipesFromServer():Observable<Recipe[]>{
    return this.http.get<Recipe[]>('https://localhost:7213/api/Recipe');
  }
   
public save(recipe: Recipe): Observable<any> {
  recipe.code=RecipService.code++

  return this.http.post('https://localhost:7213/api/Recipe', recipe)
}
  getRecipById(id:number): Observable<Recipe> {
    return this.http.get<Recipe>(`https://localhost:7213/api/Recipe/${id}`)
  }  
  public getCategoriesFromServer():Observable<Category[]>{
    return this.http.get<Category[]>('https://localhost:7213/api/Category');
  }
  putRecip(updatedRecipe: Recipe): Observable<any> {
    const url = `https://localhost:7213/api/Recipe/${updatedRecipe.code}`;
    return this.http.put(url, updatedRecipe);
  }
  public delete(id:number):Observable<any>{
    return this.http.delete(`https://localhost:7213/api/Recipe/${id}`)
  }
}
