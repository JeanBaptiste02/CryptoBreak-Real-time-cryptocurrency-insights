import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getAuthToken(): string | null {
    return this.cookieService.get('token');
  }

  getProfile(): Observable<any> {
    const authToken = this.getAuthToken();
    console.log('Token:', authToken);

    if (!authToken) {
      console.error('Token non disponible');
      return new Observable();
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );

    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }

  updateProfile(profile: Profile): Observable<any> {
    const authToken = this.getAuthToken();
    console.log('Token:', authToken);

    if (!authToken) {
      console.error('Token non disponible');
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.put(`${this.apiUrl}/updateProfile`, profile, { headers });
  }
}
