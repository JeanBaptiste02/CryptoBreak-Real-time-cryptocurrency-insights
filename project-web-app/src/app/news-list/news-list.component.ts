import { Component } from '@angular/core';
import { NewsListService } from '../service/news-list.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent {
  newsData: any[] = [];

  constructor(private newsListService: NewsListService) {}

  ngOnInit() {
    this.getNewsData();
  }

  getNewsData() {
    this.newsListService.getNewsData('fr', 'fr', 'crypto').subscribe(
      (data) => {
        this.newsData = data.results;
      },
      (error) => {
        console.error('Error fetching news data:', error);
      }
    );
  }
}
