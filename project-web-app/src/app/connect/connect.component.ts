import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css',
})
export class ConnectComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router) {}

  login(formData: any) {
    console.log('Login form submitted:', formData);
  }
}
