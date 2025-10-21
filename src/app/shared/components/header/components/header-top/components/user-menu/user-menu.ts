import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { LoginModal } from '@/shared/components/login-modal/login-modal';
import { RegisterModal } from '@/shared/components/register-modal/register-modal';
import { AuthStore } from '@/infrastructure/stores/auth/auth-store';
import { UserStore } from '@/infrastructure/stores/auth/user-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    MenuModule,
    LoginModal,
    RegisterModal,
  ],
  templateUrl: './user-menu.html',
  styleUrls: ['./user-menu.scss'],
})
export class UserMenu {
  displayLogin = false;
  displayRegister = false;
  private authStore = inject(AuthStore);
  private userStore = inject(UserStore);
  private router = inject(Router);
  isLoggedIn = this.authStore.isLoggedIn;

  menuItems: MenuItem[] = [
    {
      label: 'Мои объявления',
      routerLink: '/my-adverts',
      styleClass: 'menu-align',
    },
    { label: 'Настройки', routerLink: '/settings', styleClass: 'menu-align' },
    {
      label: 'Выход',
      command: () => this.logout(),
      styleClass: 'menu-align menu-item-logout',
    },
  ];

  get userName() {
    return this.userStore.user()?.name;
  }

  showLoginDialog() {
    this.displayLogin = true;
  }

  showRegisterDialog() {
    this.displayRegister = true;
  }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/']);
  }
}
