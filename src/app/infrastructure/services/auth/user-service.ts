import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { User } from '@/shared/types/user';
import { UserStore } from '@/infrastructure/stores/auth/user-store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  private userStore = inject(UserStore);

  getCurrent(rememberMe: boolean) {
    this.http.get<User>(`${this.baseUrl}/Users/current`).subscribe({
      next: (user) => this.userStore.setUser(user, rememberMe),
      error: (err) => console.error('Error loading user', err),
    });
  }
}
