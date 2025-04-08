import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Import map operator

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:5000/api/recipes'; 

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      map((recipes: any[]) => recipes.map(recipe => ({
        id: recipe._id,  // MongoDB _id mapped to id
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
      })))
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
      map((recipe: any) => ({
        id: recipe._id,  // MongoDB _id mapped to id
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
      }))
    );
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }
}
