import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
})
export class WelcomePageComponent {
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {}

  goToConnectPage() {
    this.router.navigate(['connectpage']);
  }
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }
}
