import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { LoginModalService } from './services/login-modal-service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.scss'],
})
export class LoginModal {
  @Output() registerClick = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  loginForm: FormGroup;
  serverError: string | null = null;

  private fb = inject(FormBuilder);
  private loginService = inject(LoginModalService);

  constructor() {
    this.loginForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { login, password, rememberMe } = this.loginForm.value;
    this.loginService.login(login, password, rememberMe).subscribe({
      next: () => {
        this.serverError = null;
        this.loginSuccess.emit();
      },
      error: (err) => {
        this.serverError = err.error?.errors?.[0] || 'Ошибка авторизации';
      },
    });
  }

  onRegister() {
    this.registerClick.emit();
  }
}
