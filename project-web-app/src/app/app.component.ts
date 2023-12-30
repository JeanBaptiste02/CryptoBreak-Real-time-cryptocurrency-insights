import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'project-web-app';

  constructor(private router: Router) {}
  ngOnInit(): void {}

  goToHomePage() {
    this.router.navigate(['']);
  }

  goToConnectPage() {
    this.router.navigate(['connectpage']);
  }

  goToAboutPage() {
    this.router.navigate(['aboutpage']);
  }

  goToContactPage() {
    this.router.navigate(['connectpage']);
  }

  goToProfilePage() {
    this.router.navigate(['ProfilePage']);
  }

  goToCryptoCurrencyListPage() {
    this.router.navigate(['cryptocurrencypage']);
  }

  goToNewsPage() {
    this.router.navigate(['newspage']);
  }

  goToMarketPage() {}

  goToWalletPage() {
    this.router.navigate(['walletpage']);
  }

  goToCommunityPage() {
    this.router.navigate(['communitypage']);
  }
}
