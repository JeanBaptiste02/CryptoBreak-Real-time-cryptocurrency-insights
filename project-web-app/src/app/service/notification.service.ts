// notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<{
    message: string;
    type: 'success' | 'error' | 'auth';
  }>();
  notification$ = this.notificationSubject.asObservable();

  showProfileUpdateNotification(profileName: string) {
    const message = `Profil mis à jour : ${profileName}`;
    this.showNotification(message, 'success');
  }

  showErrorNotification(errorMessage: string) {
    this.showNotification(errorMessage, 'error');
  }

  showSuccessNotification(successMessage: string) {
    this.showNotification(successMessage, 'success');
  }

  showAuthNotification(successMessage: string) {
    this.showNotification(successMessage, 'auth');
  }

  private showNotification(
    message: string,
    type: 'success' | 'error' | 'auth'
  ) {
    this.notificationSubject.next({ message, type });
  }
}
