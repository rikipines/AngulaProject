import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { courses } from "./courses.model";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
  export class coursesservice {
  
    constructor(private http: HttpClient) { }
    public getCoursesDetails(): Observable<courses[]> {
      return this.http.get<courses[]>('https://localhost:7040/api/Course')
    }
    
    public getCoursesrById(id: number): Observable<courses> {
      return this.http.get<courses>(`https://localhost:7040/api/Course/${id}`)
    }
    public updatCours(id:number,s:courses): Observable<courses> {
      return this.http.put<courses>(`https://localhost:7040/api/Course/${id}`,s);
    }
    public AddCourse(s:courses): Observable<courses> {
       return this.http.post<courses>('https://localhost:7040/api/Course/',s);
    }
}
   