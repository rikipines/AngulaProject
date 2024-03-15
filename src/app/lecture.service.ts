import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { lecture } from "./lucture.model";

@Injectable({
    providedIn: 'root'
  })
  export class LecturerService {
  
    constructor(private http: HttpClient) { }
    public getLecturerDetails(): Observable<lecture[]> {
      return this.http.get<lecture[]>('https://localhost:7040/api/lecturer')
    }
  
    // public getUserById(id: number): Observable<lecture> {
    //   return this.http.get<lecture>(`https://localhost:7040/api/Course/${id}`)
    // }
    // public login(name:string,password:string): Observable<users> {
    //   return this.http.post<users>(`https://localhost:7040/api/User`,{name,password});
    // }
    // public AddUser(s:users): Observable<users> {
    //   return this.http.post<users>(`https://localhost:7040/api/User`,s);
    // }
}