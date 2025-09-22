import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header-top.html',
  styleUrls: ['./header-top.scss'],
})
export class HeaderTopComponent {
  isLoggedIn = input(false);
}
