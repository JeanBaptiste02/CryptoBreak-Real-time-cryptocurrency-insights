import { Injectable } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey: string = 'token';
  constructor(private notificationService: NotificationService) {}

  logout() {
    // Logique pour gérer la déconnexion et supprimer le token du cookie
    document.cookie = `${this.authTokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.notificationService.showAuthNotification(
      'Au revoir et a la prochaine !!! '
    );
  }

  isAuthenticatedUser(): boolean {
    // Vérifier si le cookie "token" existe
    return document.cookie.includes(`${this.authTokenKey}=`);
  }

  getAuthToken(): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${this.authTokenKey}=`)) {
        return cookie.substring(this.authTokenKey.length + 1);
      }
    }
    return null;
  }

  isAdmin(): boolean {
    const authToken = this.getAuthToken();
    //console.log(authToken);
    if (authToken) {
      // Décodez le token JWT pour récupérer les informations sur l'utilisateur
      const decodedToken = atob(authToken.split('.')[1]);
      // console.log(decodedToken);
      const tokenData = JSON.parse(decodedToken);

      return tokenData.role.includes('admin');
    }
    return false;
  }
}
