import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginModal } from './login-modal';
import { LoginModalService } from './services/login-modal-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { throwError } from 'rxjs';

describe('LoginModal', () => {
  let component: LoginModal;
  let fixture: ComponentFixture<LoginModal>;
  let loginServiceSpy: jasmine.SpyObj<LoginModalService>;

  beforeEach(async () => {
    const loginServiceMock = jasmine.createSpyObj('LoginModalService', ['login']);

    await TestBed.configureTestingModule({
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
      providers: [
        { provide: LoginModalService, useValue: loginServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModal);
    component = fixture.componentInstance;
    loginServiceSpy = TestBed.inject(LoginModalService) as jasmine.SpyObj<LoginModalService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate login field: required, minlength, maxlength', () => {
    const loginControl = component.loginForm.controls['login'];

    loginControl.setValue('');
    expect(loginControl.valid).toBeFalse();
    expect(loginControl.errors?.['required']).toBeTruthy();

    loginControl.setValue('abc');
    expect(loginControl.valid).toBeFalse();
    expect(loginControl.errors?.['minlength']).toBeTruthy();

    loginControl.setValue('a'.repeat(65));
    expect(loginControl.valid).toBeFalse();
    expect(loginControl.errors?.['maxlength']).toBeTruthy();

    loginControl.setValue('validlogin');
    expect(loginControl.valid).toBeTrue();
  });

  it('should validate password field: required, minlength', () => {
    const passwordControl = component.loginForm.controls['password'];

    passwordControl.setValue('');
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['required']).toBeTruthy();

    passwordControl.setValue('1234567');
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['minlength']).toBeTruthy();

    passwordControl.setValue('12345678');
    expect(passwordControl.valid).toBeTrue();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(loginServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should handle server error on failed login', fakeAsync(() => {
    const errorResponse = { error: { errors: ['Invalid login or password'] } };
    loginServiceSpy.login.and.returnValue(throwError(() => errorResponse));

    component.loginForm.setValue({
      login: 'invaliduser',
      password: 'invalidpassword',
      rememberMe: false,
    });
    component.onSubmit();
    tick();

    expect(component.serverError).toBe('Invalid login or password');
  }));

  it('should emit registerClick on register click', () => {
    const registerSpy = jasmine.createSpy('registerClick');
    component.registerClick.subscribe(registerSpy);

    component.onRegister();
    expect(registerSpy).toHaveBeenCalled();
  });

});