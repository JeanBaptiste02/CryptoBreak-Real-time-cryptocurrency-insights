// signup-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private signupService: SignupService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.signupService.signup(formData).subscribe(
        (response) => {
          console.log('Inscription réussie !', response);
          // Gérer la redirection ou d'autres actions après une inscription réussie
        },
        (error) => {
          console.error("Erreur lors de l'inscription", error);
          // Gérer les erreurs, afficher des messages à l'utilisateur, etc.
        }
      );
    }
  }
}
