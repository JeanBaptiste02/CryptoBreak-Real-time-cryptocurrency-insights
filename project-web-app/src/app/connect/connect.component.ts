import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectService } from '../service/connect.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css',
})
export class ConnectComponent implements OnInit {
  loggedIn: boolean = false;

  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', Validators.required],
  });

  username: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private connectService: ConnectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  toggleLoggedIn() {
    this.loggedIn = !this.loggedIn;
  }

  login(formData: any) {
    this.connectService
      .login({ email: this.username, password: this.password })
      .subscribe((response) => {
        console.log('Server response:', response);
      });
  }

  loginWithGoogle(): void {
    // Redirigez l'utilisateur vers votre backend pour l'authentification Google
    window.location.href = 'http://localhost:4000/auth/google';
    this.authService.updateGoogleAuthStatus(true);
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.connectService.signup(formData).subscribe(
        (response) => {
          console.log('Inscription réussie !', response);
        },
        (error) => {
          console.error("Erreur lors de l'inscription", error);
        }
      );
    }
  }
}
