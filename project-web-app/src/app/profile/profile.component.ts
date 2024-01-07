import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { NotificationService } from '../service/notification.service';
import { Profile } from './profile.model';
import { UserService } from '../service/user.service'; // Ajoutez ceci

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: Profile | null = null;
  selectedMenuItem: 'coordonnees' | 'defaultCurrency' = 'coordonnees';

  constructor(
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.user = data;
      this.userService.setUsername(data?.name || null);
    });
  }

  updateProfile() {
    if (this.user) {
      this.profileService.updateProfile(this.user).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          // Après la mise à jour, affichez la notification spécifique au profil
          this.notificationService.showSuccessNotification(
            'mise a jour du profile avec success '
          );
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}