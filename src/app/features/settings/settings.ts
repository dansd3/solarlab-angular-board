import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { SettingsBusiness } from './services/settings-service';
import { UserStore } from '@/infrastructure/stores/auth/user-store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
    templateUrl: './settings.html',
    styleUrls: ['./settings.scss'],
    providers: [MessageService]
})
export class Settings {
    private business = inject(SettingsBusiness);
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);
    private userStore = inject(UserStore);
    private router = inject(Router);
    user = this.userStore.user;

    form: FormGroup = this.fb.group({
        name: [this.user()?.name || '', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
        confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }

    onSubmit() {
        if (this.form.invalid) {
            Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
            });
            return;
        }

        const id = this.user()?.id;
        if (!id) {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пользователь не найден' });
            return;
        }

        this.business.updateUser(id, this.form.value.name, this.form.value.login, this.form.value.password).subscribe({
            next: (response) => {
                this.userStore.user.update(u => u ? { ...u, name: response.name, login: response.login } : null);
                this.messageService.add({ severity: 'success', summary: 'Успех', detail: 'Данные обновлены' });
                this.router.navigate(['/']);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось обновить данные' });
            }
        });
    }
}