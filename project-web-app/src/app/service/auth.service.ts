import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey: string = 'token';

  login(token: string) {
    // Logique pour gérer la connexion et stocker le token dans le cookie
    document.cookie = `${this.authTokenKey}=${token}`;
  }

  logout() {
    // Logique pour gérer la déconnexion et supprimer le token du cookie
    document.cookie = `${this.authTokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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
    if (authToken) {
      // Décodez le token JWT pour récupérer les informations sur l'utilisateur
      const decodedToken = atob(authToken.split('.')[1]);
      const tokenData = JSON.parse(decodedToken);

      console.log('izan ' + tokenData.roles.value());
      // Vérifiez si l'utilisateur a le rôle d'administrateur
      return tokenData.roles.includes('admin');
    }
    return false;
  }
}
