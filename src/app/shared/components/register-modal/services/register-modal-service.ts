import { Injectable, inject } from '@angular/core';
import { AuthService } from '@/infrastructure/services/auth/auth-service';
import { AuthStore } from '@/infrastructure/stores/auth/auth-store';
import { UserService } from '@/infrastructure/services/auth/user-service';
import { Observable, switchMap, tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';

interface RegisterData {
  name: string;
  login: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class RegisterModalService {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private userService = inject(UserService);

  register(data: RegisterData): Observable<string> {
    return this.authService.register(data).pipe(
      switchMap(() => this.authService.login({ login: data.login, password: data.password })),
      tap((token) => {
        this.authStore.setLoggedIn(true, token, true);
        this.userService.getCurrent(true);
      }),
      catchError((error) => {
        const errorMessage = error.message === 'Invalid login or password' 
          ? 'Invalid login or password' 
          : 'Ошибка сервера';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}