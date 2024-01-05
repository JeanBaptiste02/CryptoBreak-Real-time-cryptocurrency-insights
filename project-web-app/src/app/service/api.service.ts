import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
