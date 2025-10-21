import { Injectable, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthStore } from '@/infrastructure/stores/auth/auth-store';
import { UserStore } from '@/infrastructure/stores/auth/user-store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserMenuService {
  private authStore = inject(AuthStore);
  private userStore = inject(UserStore);
  private router = inject(Router);
  isLoggedIn = this.authStore.isLoggedIn;
  menuItems: MenuItem[] = [
    { label: 'Мои объявления', routerLink: '/my-adverts' },
    { label: 'Настройки', routerLink: '/settings' },
    {
      label: 'Выход',
      command: () => this.logout(),
      styleClass: 'menu-item-logout',
    },
  ];
  get userName() {
    return this.userStore.user()?.name || 'User';
  }
  logout() {
    this.authStore.logout();
    this.router.navigate(['/']);
  }
}
