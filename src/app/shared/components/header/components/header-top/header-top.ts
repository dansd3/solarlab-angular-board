import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserMenu } from './components/user-menu/user-menu';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@/infrastructure/stores/auth/auth-store';
@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [CommonModule, ButtonModule, UserMenu, RouterModule],
  templateUrl: './header-top.html',
  styleUrls: ['./header-top.scss'],
})
export class HeaderTopComponent {
  private authStore = inject(AuthStore);
  isLoggedIn = this.authStore.isLoggedIn;
}
