import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { category } from "./category.model";

@Injectable({
    providedIn: 'root'
  })
  export class categoryservice {
  
    constructor(private http: HttpClient) { }
    public getCategoryDetails(): Observable<category[]> {
      return this.http.get<category[]>('https://localhost:7040/api/Category')
    }
    public getCoursesrById(id: number): Observable<category> {
      return this.http.get<category>(`https://localhost:7040/api/Category/${id}`)
    }
    // public updatCours(name:string,courses:courses): Observable<courses> {
    //   return this.http.put<courses>(`https://localhost:7040/api/User`,{name,courses});
    // }
    // public AddUser(s:category): Observable<category> {
    //   return this.http.post<category>(`https://localhost:7040/api/User`,{s});
    // }
}
   