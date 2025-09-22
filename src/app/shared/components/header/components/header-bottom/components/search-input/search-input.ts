import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.scss'],
})
export class SearchInputComponent {
  placeholder = input('Поиск по обьявлениям');
  searchTerm = '';
  searchChange = output<string>();
}
