import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserMenu } from './components/user-menu/user-menu';

@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [CommonModule, ButtonModule, UserMenu],
  templateUrl: './header-top.html',
  styleUrls: ['./header-top.scss'],
})
export class HeaderTopComponent {}
