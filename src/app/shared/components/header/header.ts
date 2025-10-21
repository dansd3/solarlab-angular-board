import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderTopComponent } from './components/header-top/header-top';
import { HeaderBottomComponent } from './components/header-bottom/header-bottom';
import { AuthStore } from '@/infrastructure/stores/auth/auth-store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderTopComponent,
    HeaderBottomComponent,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  authStore = inject(AuthStore);
  isLoggedIn = this.authStore.isLoggedIn;
}
