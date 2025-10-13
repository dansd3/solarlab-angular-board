import { Component, effect, input } from '@angular/core';
import { SearchHeaderService } from './services/search-header-service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-search-header',
  standalone: true,
  templateUrl: './search-header.html',
  styleUrls: ['./search-header.scss'],
})
export class SearchHeader {
  query = input<string | undefined>();
  categoryId = input<string | undefined>();

  categoryName: string | null = null;
  private categoryBusiness = inject(SearchHeaderService);

  constructor() {
    effect(() => {
      const id = this.categoryId();
      if (id) {
        this.categoryBusiness.getName(id).subscribe({
          next: (name) => (this.categoryName = name),
          error: (err) => console.error('Ошибка при получении категории:', err),
        });
      }
    });
  }
}
