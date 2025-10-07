import { Injectable, signal } from '@angular/core';
import { User } from '@/shared/types/user';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly userKey = 'currentUser';
  user = signal<User | null>(null);

  constructor() {
    const stored = this.getCookie(this.userKey);
    this.user.set(stored ? JSON.parse(stored) : null);
  }

  setUser(userData: User, rememberMe: boolean) {
    this.user.set(userData);
    const expires = rememberMe ? 'expires=Fri, 31 Dec 9999 23:59:59 GMT' : '';
    document.cookie = `${this.userKey}=${JSON.stringify(userData)}; path=/; ${expires}; SameSite=Strict; Secure`;
  }

  clearUser() {
    this.user.set(null);
    document.cookie = `${this.userKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)'),
    );
    return match ? match[2] : null;
  }
}
