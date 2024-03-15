import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { users } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ServiesService {

  constructor(private http: HttpClient) { }
  public getUserDetails(): Observable<users[]> {
    return this.http.get<users[]>('https://localhost:7040/api/User')
  }

  public getUserById(id: number): Observable<users> {
    return this.http.get<users>(`https://localhost:7040/api/Course/${id}`)
  }
  public login(name:string,password:string): Observable<users> {
    return this.http.post<users>(`https://localhost:7040/api/User`,{name,password});
  }
  public AddUser(s:users): Observable<users> {
    return this.http.post<users>(`https://localhost:7040/api/User`,s);
  }
 


  // public postCourses(c: Courses): Observable<any> {
  //   return this.http.post('https://localhost:7000/api/Customer', c)
  // }

  // public deleteCourses(id: Number): Observable<any> {
  //   return this.http.delete(`https://localhost:7000/api/Customer/${id}`)
  // }

  // public putCourses(c:Courses):Observable<any> {
  //   return this.http.put('https://localhost:7000/api/Customer',c)
  // }

}
