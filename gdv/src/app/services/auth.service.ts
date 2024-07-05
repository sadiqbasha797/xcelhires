import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://43.205.202.221:5001/admin/auth/login';
  private tokenRegenerateUrl = 'http://43.205.202.221:5001/test/auth/tokenRegenerate';
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials).pipe(
      tap((response: any) => {
        if (response.status === 200 && response.accessToken) {
          this.setToken(response.accessToken);
          this.setAuthenticated(true);
        } else {
          console.error('Login failed or accessToken missing');
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  regenerateToken(): Observable<any> {
    return this.http.post(this.tokenRegenerateUrl, { token: this.getToken() }).pipe(
      tap((response: any) => {
        console.log('Token regeneration response:', response); 
        if (response.status === 200 && response.accessToken) {
          this.setToken(response.accessToken);
        } else {
          console.error('Token regeneration failed or accessToken missing');
        }
      }),
      catchError(this.handleError)
    );
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  get isAuthenticatedStatus(): boolean {
    return this.isAuthenticated;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP Error:', error.message); 
    if (error.status === 401) {
      this.logout();
    }
    return throwError('An error occurred - ' + error.message);
  }
}
