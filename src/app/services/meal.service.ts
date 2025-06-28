import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  url: string = "	https://www.themealdb.com/api/json/v1/1/"

  constructor(
    private http: HttpClient
  ) { }

  categorias(): Observable<any> {
    return this.http.get(`${this.url}categories.php`);
  }

  paises(): Observable<any> {
    return this.http.get(`${this.url}list.php?a=list`)
  }

  random(): Observable<any> {
    return this.http.get(`${this.url}random.php`)
  }

  list(): Observable<any> {
    return this.http.get(`${this.url}search.php?f=d`)
  }

  getId(id: any): Observable<any> {
    return this.http.get(`${this.url}lookup.php?i=${id}`)
  }
}
