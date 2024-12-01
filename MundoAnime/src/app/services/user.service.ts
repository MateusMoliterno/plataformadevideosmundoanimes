import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonServerUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.jsonServerUrl}?email=${email}`).pipe(
      map((users) => (users.length > 0 ? users[0] : null)),
      catchError(() => of(null)) 
    );
  }

  saveUser(user: any): Observable<any> {
    return this.getUserByEmail(user.email).pipe(
      switchMap((existingUser) => {
        if (existingUser) {

          return of(existingUser);
        } else {

          return this.http.post(this.jsonServerUrl, user);
        }
      })
    );
  }
}
