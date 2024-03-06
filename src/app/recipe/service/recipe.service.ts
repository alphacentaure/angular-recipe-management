import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../../ingredient/model/ingredient';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url = 'http://localhost:8080/api/v1/recipe';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  get(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.url}/${id}`);  
  }

  create(data: Recipe) : Observable<Recipe> {
    return this.http.post<Recipe>(this.url,data); 
  }

  update(data: Recipe) : Observable<Recipe> {
    return this.http.put<Recipe>(`${this.url}/${data.id}`,data); 
  }

  delete(id:number) : Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.url}/${id}`); 
  }
  
  addIngredientToRecipe(id:number, data: Ingredient) : Observable<Recipe> {
    return this.http.post<Recipe>(`${this.url}/${id}/add-ingredient`, data); 
  }

  removeIngredientFromRecipe(id:number, data: Ingredient) : Observable<Recipe> {
    return this.http.post<Recipe>(`${this.url}/${id}/remove-ingredient`,data); 
  }
  
}
