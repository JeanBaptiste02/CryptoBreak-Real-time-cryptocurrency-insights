import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from './connect.service';
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css',
})
export class ConnectComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private connectService: ConnectService) {}

  login(formData: any) {
    this.connectService
      .login({ email: this.username, password: this.password })
      .subscribe((response) => {
        console.log('Server response:', response);
      });
  }
}
