import { Component } from '@angular/core';
import { NewsListService } from '../service/news-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent {
  newsData: any[] = [];

  constructor(
    private newsListService: NewsListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getNewsData();
  }

  getNewsData() {
    this.newsListService.getNewsData('fr', 'fr', 'crypto').subscribe(
      (data) => {
        this.newsData = data;
      },
      (error) => {
        console.error('Error fetching news data:', error);
      }
    );
  }

  extractThreeSentences(content: string): string {
    const sentences = content.split(/[.!?]/);

    const firstThreeSentences = sentences.slice(0, 3).join('. ');

    return firstThreeSentences;
  }

  toggleContent(news: any) {
    news.expanded = !news.expanded;
  }

  navigateToSingleNewsContent(articleId: string): void {
    console.log('Navigating to single news with articleId:', articleId);
    if (articleId) {
      this.router.navigate(['singlenewspage', articleId]);
    } else {
      console.error('Invalid articleId:', articleId);
    }
  }
}
