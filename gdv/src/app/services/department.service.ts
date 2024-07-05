import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://43.205.202.221:5001/admin/department';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getDepartments(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


    return this.http.get(`${this.baseUrl}/list`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error.message); 
        return throwError(error);
      })
    );
  }
}
