import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { NewsListService } from '../service/news-list.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrl: './single-news.component.css',
})
export class SingleNewsComponent implements OnInit {
  newsData: any[] = [];

  constructor(
    private router: Router,
    private newsListService: NewsListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const articleId = params.get('articleId');

      if (articleId !== null) {
        this.getSingleNewsContent(articleId);
      } else {
        console.error('Article ID is null.');
      }
    });
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

  getSingleNewsContent(articleId: string) {
    this.newsListService
      .getOneNewsData('fr', 'fr', 'crypto', articleId)
      .subscribe(
        (data) => {
          // Ensure data is an array, if not, wrap it in an array
          this.newsData = Array.isArray(data) ? data : [data];
        },
        (error) => {
          console.error('Error fetching news data:', error);
        }
      );
  }

  goToNewsPage() {
    this.router.navigate(['newspage']);
  }
}
