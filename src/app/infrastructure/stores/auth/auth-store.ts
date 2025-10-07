import { inject, Injectable, signal } from '@angular/core';
import { UserStore } from './user-store';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly loggedInKey = 'isLoggedIn';
  private readonly tokenKey = 'authToken';
  isLoggedIn = signal<boolean>(false);
  token = signal<string | null>(null);
  private userStore = inject(UserStore);

  constructor() {
    this.isLoggedIn.set(this.getCookie(this.loggedInKey) === 'true');
    this.token.set(this.getCookie(this.tokenKey) || null);
  }

  setLoggedIn(value: boolean, token: string | null, rememberMe: boolean) {
    this.isLoggedIn.set(value);
    this.token.set(token);
    const expires = rememberMe ? 'expires=Fri, 31 Dec 9999 23:59:59 GMT' : '';
    document.cookie = `${this.loggedInKey}=${value}; path=/; ${expires}; SameSite=Strict; Secure`;
    document.cookie = `${this.tokenKey}=${token || ''}; path=/; ${expires}; SameSite=Strict; Secure`;
  }

  logout() {
    this.isLoggedIn.set(false);
    this.token.set(null);
    this.userStore.clearUser();
    document.cookie = `${this.loggedInKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = `${this.tokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)'),
    );
    return match ? match[2] : null;
  }
}
