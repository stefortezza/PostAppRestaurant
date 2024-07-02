import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from 'src/interfaces/auth-data.interface';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8080/auth';
  private token: string | null = null;
  private authSub = new BehaviorSubject<string | null>(this.getStoredUser());
  user$ = this.authSub.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.authSub.next(storedUser);
    }
  }

  login(user: { email: string, password: string }): Observable<string> {
    return this.http.post(`${this.apiURL}/login`, user, { responseType: 'text' }).pipe(
      tap((token: string) => {
        const authData: AuthData = {
          accessToken: token,
          user: {
            id: '1', // Esempio di ID, sostituisci con i dati dell'utente dal backend
            name: '', // Esempio di nome, sostituisci con i dati dell'utente
            surname: '', // Esempio di cognome, sostituisci con i dati dell'utente
            email: user.email
          }
        };

        this.token = token;
        console.log('Token received:', token);
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
  }

  private getStoredUser(): string | null {
    const storedUser = localStorage.getItem('user');
    return storedUser || null;
  }

  signUp(user: { email: string, password: string }): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error in AuthService:', error);
    return throwError('Errore durante la registrazione');
  }
}
