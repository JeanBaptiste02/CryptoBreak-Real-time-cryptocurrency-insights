import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public username$: Observable<string | null> =
    this.usernameSubject.asObservable();

  private preferencesSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public preferences$: Observable<string[]> =
    this.preferencesSubject.asObservable();

  setUsername(username: string | null) {
    this.usernameSubject.next(username);
  }

  getUsername(): string | null {
    return this.usernameSubject.value;
  }

  setPreferences(preferences: string[]) {
    this.preferencesSubject.next(preferences);
  }

  getPreferences(): string[] {
    return this.preferencesSubject.value;
  }
}
