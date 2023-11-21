import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
})
export class WelcomePageComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  goToConnectPage() {
    this.router.navigate(['connectpage']);
  }
}
