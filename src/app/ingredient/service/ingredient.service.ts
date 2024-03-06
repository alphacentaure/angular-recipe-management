import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private url = 'http://localhost:8080/api/v1/ingredient';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.url);
  }

  get(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.url}/${id}`);  
  }

  create(data: Ingredient) : Observable<Ingredient> {
    return this.http.post<Ingredient>(this.url,data); 
  }

  update(data: Ingredient) : Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.url}/${data.id}`,data); 
  }

  delete(id:number) : Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.url}/${id}`); 
  }
  
}
