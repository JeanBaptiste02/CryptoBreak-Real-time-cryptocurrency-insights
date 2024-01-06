import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCoins(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/coins/cryptos`);
  }

  getCoinInfo(id: string | null) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${id}`);
  }

  getCurrency(currency: string): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/coins/cryptos`);
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
