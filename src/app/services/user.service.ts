import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  static code: number = 100
  public name: string
  public details: User
  public getUsersFromServer(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:7213/api/User');
  }
  public save(u: User): Observable<any> {
    u.code = UserService.code++
    return this.http.post('https://localhost:7213/api/User', u)
  }
  public getUserById(password: string): Observable<User> {
    return this.http.get<User>(`https://localhost:7213/api/User/${password}`)
  }
  public saveUserToSessionStorage() {
    const detailsJsonString = JSON.stringify(this.details);
    console.log("this.details", this.details)
    sessionStorage.setItem('userDetails', detailsJsonString);
  }
}
