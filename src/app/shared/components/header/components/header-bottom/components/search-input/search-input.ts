import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.scss'],
})
export class SearchInput {
  placeholder = input('Поиск по обьявлениям');
  searchTerm = '';
  searchChange = output<string>();
  private router = inject(Router);
  onSearch() {
    if (this.searchTerm) {
      console.log(this.searchTerm);
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    }
  }
}
