import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class Myfavorite {
  private baseUrl = 'http://localhost:4000/crypto/favorit/crypto';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getUrl(): string {
    return this.baseUrl;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  updatecrypto(cryptocurrencies: string, token: string): Observable<any> {
    const url = `http://localhost:4000/users/deleteProfilectypto`;

    // Ajoutez le token à l'en-tête de la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assurez-vous d'ajuster le type de contenu selon vos besoins
    });

    const body = { cryptocurrencies };

    // Vous pouvez ajuster le corps de la requête en fonction de vos besoins
    return this.http.put(url, body, { headers });
  }

  getCoins(token: string): Observable<any[]> {
    // Ajoutez le token à l'en-tête de la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assurez-vous d'ajuster le type de contenu selon vos besoins
    });
    const url = `${this.getUrl()}`;
    return this.http.get<any[]>(url, { headers });
  }

  getCoinInfo(id: string | null) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${id}`);
  }

  getCurrency(currency: string): Observable<any> {
    const url = `${this.getUrl()}`;
    return this.http.get<any>(url);
  }

  getTrendingCurrency(currency: string) {
    return this.http.get<any>(`http://localhost:4000/coins/cryptos/trend`);
  }
  getGrpahicalCurrencyData(coinId: string, days: number) {
    return this.http.get<any>(
      `http://localhost:4000/coins/cryptos/${coinId}/details/${days}`
    );
  }

  getChartData(id: any, days: any, currency: any) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
  }

  getCurrencyById(coinId: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );
  }

  addCrypto(name: string, token: string): Observable<any> {
    const url = `http://localhost:4000/crypto//crypto/${name}`;

    // Ajoutez le token à l'en-tête de la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assurez-vous d'ajuster le type de contenu selon vos besoins
    });

    // Vous pouvez ajuster le corps de la requête en fonction de vos besoins
    return this.http.post(url, {}, { headers });
  }

  deleteCrypto(name: string, token: string): Observable<any> {
    const url = `http://localhost:4000/crypto//crypto/${name}`;

    // Ajoutez le token à l'en-tête de la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assurez-vous d'ajuster le type de contenu selon vos besoins
    });

    // Vous pouvez ajuster le corps de la requête en fonction de vos besoins
    return this.http.delete(url, { headers });
  }
}
