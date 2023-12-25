import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCoins(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:4000/api/coins/cryptos`);
  }

  getCurrency(currency: string): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/coins/cryptos`);
  }

  getTrendingCurrency(currency: string) {
    return this.http.get<any>(`http://localhost:4000/api/coins/cryptos/id`);
  }
  getGrpahicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
    );
  }
  getCurrencyById(coinId: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}`
    );
  }
}
