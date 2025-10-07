import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

interface LoginRequest {
  login: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  login(body: LoginRequest): Observable<string> {
    const response = this.http.post<string>(`${this.baseUrl}/Auth/Login`, body);
    return response;
  }

  register(body: RegisterRequest): Observable<string> {
    const response = this.http.post<string>(
      `${this.baseUrl}/Auth/Register`,
      body,
    );
    return response;
  }
}
