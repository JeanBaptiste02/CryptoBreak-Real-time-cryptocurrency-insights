import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'project-web-app';

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  logout() {
    this.notificationService.showAuthNotification(
      '👋 Bon retour ! Explorez nos nouveautés et profitez de votre expérience. 😊'
    );
    this.authService.logout();
    this.router.navigate(['/']);
  }

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

  goTofavoritPage(){
    this.router.navigate(['favoritepage']);
  }
}
