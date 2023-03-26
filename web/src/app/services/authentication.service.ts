import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticatedUser!: User;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>("http://localhost:3000/auth/login",{username, password}).pipe(
      mergeMap((data) => of({username, password, token: data.token})),
      catchError( () => throwError(() => new Error("BAD credentials")))
    )
  }

  public authenticate(user: User): Observable<boolean> {
    if(user.token) {
      user.password = undefined;
      this.authenticatedUser = user;
      localStorage.setItem("authUser", JSON.stringify(user));
      return of(true);
    } else {
      return of(false);
    }
  }

  public isAuthenticated(): boolean {
    if(this.authenticatedUser){
      return true;
    } else {
      const UserValue = localStorage.getItem('authUser');
      if (UserValue) {
        this.authenticatedUser = JSON.parse(UserValue);
        return true;
      }
    }
    return false;
  }

  public getToken(): User {
    const UserValue = localStorage.getItem('authUser');
    if (UserValue) {
      return (JSON.parse(UserValue) as User);
    }
    throw  new Error("User search Error");
  }
}
