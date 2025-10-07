import { Injectable, inject } from '@angular/core';
import { AuthService } from '@/infrastructure/services/auth/auth-service';
import { AuthStore } from '@/infrastructure/stores/auth/auth-store';
import { UserService } from '@/infrastructure/services/auth/user-service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private userService = inject(UserService);

  login(
    login: string,
    password: string,
    rememberMe: boolean,
  ): Observable<string> {
    return this.authService.login({ login, password }).pipe(
      tap((response) => {
        this.authStore.setLoggedIn(true, response, rememberMe);
        this.userService.getCurrent(rememberMe);
      }),
    );
  }
}
