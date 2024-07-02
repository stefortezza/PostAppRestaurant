import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Antipasti, OptionalIngredient } from 'src/interfaces/antipasti';
import { Ingredient } from 'src/interfaces/ingredient';

@Injectable({
  providedIn: 'root'
})
export class DataService implements HttpInterceptor {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('user')?.trim() || '';
    
    if (userToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
      });
    }

    return next.handle(req);
  }

  fetchData(endpoint: string): Observable<Antipasti[]> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.httpClient.get<Antipasti[]>(url, { responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  postData(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.httpClient.post<any>(url, data, { responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  postIngredient(data: Ingredient): Observable<any> {
    const url = `${this.apiUrl}/ingredients`;
    return this.httpClient.post<any>(url, data, { responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  postOptionalIngredient(data: OptionalIngredient): Observable<any> {
    const url = `${this.apiUrl}/opzionali`;
    return this.httpClient.post<any>(url, data, { responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
