import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  isLoggedIn = signal<boolean>(false);
}