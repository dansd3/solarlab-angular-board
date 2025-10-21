import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInput } from './components/search-input/search-input';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-bottom',
  standalone: true,
  imports: [CommonModule, SearchInput, ButtonModule, RouterLink],
  templateUrl: './header-bottom.html',
  styleUrls: ['./header-bottom.scss'],
})
export class HeaderBottomComponent {
  onSearch(query: string) {
    console.log('Search:', query);
  }
}
