import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  private apiUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { user: userData }).pipe(
      map((response: any) => {
        // Gérer la réponse du serveur, ici vous pouvez effectuer des opérations comme la gestion du token
        const token = response.token; // Assurez-vous que le nom du champ correspond à votre API
        if (token) {
          // Stockez le token dans le cookie
          this.cookieService.set('token', token);
        }

        // Vous pouvez également retourner d'autres données du serveur si nécessaire
        return response;
      }),
      catchError((error: any) => {
        // Gérer les erreurs du serveur
        return throwError(error);
      })
    );
  }
}
