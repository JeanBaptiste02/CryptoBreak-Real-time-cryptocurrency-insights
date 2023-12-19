import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsListService {
  constructor(private http: HttpClient) {}

  getNewsData(country: string, language: string, query: string) {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_350602bb764b88ab03dabf30d0c3cd26d95bd&q=crypto&country=cn,fr,in,ru,us&language=fr`;
    return this.http.get<any>(apiUrl);
  }
}
