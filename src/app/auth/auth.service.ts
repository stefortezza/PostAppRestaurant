import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthData } from 'src/interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8080/auth';
  private token: string | null = null;
  private authSub = new BehaviorSubject<string | null>(this.getStoredUser());
  user$ = this.authSub.asObservable();
  productService: any;

  constructor(private http: HttpClient) {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.authSub.next(storedUser);
    }
  }

  login(user: { email: string, password: string }): Observable<string> {
    return this.http.post(`${this.apiURL}/login`, user, { responseType: 'text' }).pipe(
      tap((token: string) => {
        this.token = token;
        this.authSub.next(token);
        localStorage.setItem('user', token);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.token = null;
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.productService.resetProducts();
  }

  private getStoredUser(): string | null {
    return localStorage.getItem('user');
  }

  signUp(user: { email: string, password: string }): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  public isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return !!currentUser && currentUser.user.role === 'ADMIN';
  }

  private getCurrentUser(): AuthData | null {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      const tokenData = this.parseJwt(storedUser);
      if (tokenData) {
        return {
          accessToken: storedUser,
          user: {
            id: tokenData.id,
            name: tokenData.name,
            surname: tokenData.surname,
            email: tokenData.email,
            role: tokenData.role
          }
        };
      }
    }
    return null;
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('Error in AuthService:', error);
    return throwError('Errore durante la registrazione');
  }
}
