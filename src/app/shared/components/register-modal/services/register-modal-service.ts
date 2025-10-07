import { Injectable, inject } from '@angular/core';
import { AuthService } from '@/infrastructure/services/auth/auth-service';
import { AuthStore } from '@/infrastructure/stores/auth/auth-store';
import { UserService } from '@/infrastructure/services/auth/user-service';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterModalService {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private userService = inject(UserService);

  register(name: string, login: string, password: string): Observable<string> {
    return this.authService.register({ name, login, password }).pipe(
      switchMap(() => this.authService.login({ login, password })),
      tap((token) => {
        this.authStore.setLoggedIn(true, token, true);
        this.userService.getCurrent(true);
      }),
    );
  }
}
