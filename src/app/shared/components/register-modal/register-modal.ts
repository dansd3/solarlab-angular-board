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
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { RegisterModalService } from './services/register-modal-service';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
  ],
  templateUrl: './register-modal.html',
  styleUrls: ['./register-modal.scss'],
})
export class RegisterModal {
  @Output() registerSuccess = new EventEmitter<void>();

  registerForm: FormGroup;
  serverError: string | null = null;

  private fb = inject(FormBuilder);
  private registerService = inject(RegisterModalService);

  constructor() {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
        ],
      ],
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get nameControl() {
    return this.registerForm.get('name');
  }

  get loginControl() {
    return this.registerForm.get('login');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.serverError = null;
      this.registerService.register(this.registerForm.value).subscribe({
        next: () => {
          this.registerSuccess.emit();
        },
        error: (err) => {
          this.serverError = err.message;
        },
      });
    }
  }
}