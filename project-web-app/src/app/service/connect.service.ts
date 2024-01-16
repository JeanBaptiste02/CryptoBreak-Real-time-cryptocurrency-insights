import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError, of } from 'rxjs';
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
        this.notificationService.showAuthNotification(
          '👋 Bon retour ! Explorez nos nouveautés et profitez de votre expérience. 😊'
        );
        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  signup(formData: any): Observable<any> {
    this.router.navigate(['/']);

    // Display success notification
    this.notificationService.showAuthNotification(
      '👋 Bienvenue ! Vous avez réussi à créer votre compte ! 😊'
    );

    // Make the HTTP request and handle errors using catchError
    return this.http.post(`${this.apiUrl}/register`, formData).pipe(
      catchError((error) => {
        // Handle HTTP request error here
        console.error('An error occurred during signup:', error);

        // Display error notification
        this.notificationService.showErrorNotification(
          'Vous avez utilisé un e-mail qui existe déjà !'
        );

        // Re-throw the error for further handling if necessary
        return of(null);
      })
    );
  }
}
