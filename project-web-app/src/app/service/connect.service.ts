import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  private apiUrl = 'http://localhost:4000/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { user: userData }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          this.cookieService.set('token', token);
        }
        this.router.navigate(['/']);
        this.notificationService.showAuthNotification('Bonjour et Bienvenu  ');
        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  signup(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }
}
