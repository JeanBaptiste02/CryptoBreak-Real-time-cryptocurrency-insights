import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  showProfileUpdateNotification(profileName: string) {
    const message = `Profil mis à jour : ${profileName}`;
    this.showNotification(message);
  }

  showNotification(message: string) {
    this.notificationSubject.next(message);
  }
}
