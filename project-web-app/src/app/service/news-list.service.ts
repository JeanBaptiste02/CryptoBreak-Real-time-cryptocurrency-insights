import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsListService {
  constructor(private http: HttpClient) {}

  getNewsData(country: string, language: string, query: string) {
    const apiUrl = `http://localhost:4000/articles/articles`;
    return this.http.get<any>(apiUrl);
  }

  getOneNewsData(
    country: string,
    language: string,
    query: string,
    article_id: string
  ) {
    const apiUrl = `http://localhost:4000/articles/articles/${article_id}`;
    return this.http.get<any>(apiUrl);
  }
}
