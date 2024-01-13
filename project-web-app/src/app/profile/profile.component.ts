import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ProfileService } from '../service/profile.service';
import { NotificationService } from '../service/notification.service';
import { Profile } from './profile.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: Profile | null = null;
  bsModalRef: BsModalRef | undefined;

  selectedMenuItem: 'coordonnees' | 'myprefences' | 'defaultCurrency' =
    'coordonnees';

  constructor(
    private profileService: ProfileService,
    private notificationService: NotificationService,
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  openAddCryptoModal() {
    this.bsModalRef = this.modalService.show(
      `<div class="modal-header">
      <h4 class="modal-title">Add Crypto</h4>
      <button type="button" class="close" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <!-- Ajoutez du contenu ici -->
      <!-- Par exemple, un formulaire d'ajout de crypto -->
    </div>`
    );
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.user = data;
      this.userService.setUsername(data?.name || null);
      this.userService.setPreferences(data?.cryptocurrencies || null);
    });
  }

  getPreference(): string[] {
    let hello = this.userService.getPreferences();
    console.log(hello);
    return this.userService.getPreferences();
  }

  removePreference(preference: string) {
    if (this.user) {
      const updatedPreferences = this.user.cryptocurrencies.filter(
        (p) => p !== preference
      );
      this.user.cryptocurrencies = updatedPreferences;

      this.profileService.updateProfile(this.user).subscribe(
        (response) => {
          console.log('Preference removed successfully:', response);
          this.notificationService.showSuccessNotification(
            'Préférence supprimée avec succès'
          );
        },
        (error) => {
          console.error('Error removing preference:', error);
        }
      );
    }
  }

  updateProfile() {
    if (this.user) {
      this.profileService.updateProfile(this.user).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.notificationService.showSuccessNotification(
            'Mise à jour du profil avec succès'
          );
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}
