import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { AdCard } from '../advert-list/components/ad-card/ad-card';
import { SearchHeader } from './components/search-header/search-header';
import { SearchListService } from './services/search-list-service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Ad } from '@/shared/types/ad';
import { CategoriesList } from './components/categories-list/categories-list';
@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    AdCard,
    SearchHeader,
    CategoriesList,
  ],
  templateUrl: './search-list.html',
  styleUrls: ['./search-list.scss'],
})
export class SearchList {
  private business = inject(SearchListService);
  private route = inject(ActivatedRoute);
  minPrice = signal<number | undefined>(undefined);
  maxPrice = signal<number | undefined>(undefined);
  selectedSort = signal<string>('time_desc');
  sortOptions = [
    { label: 'Цена по возрастанию', value: 'price_asc' },
    { label: 'Цена по убыванию', value: 'price_desc' },
    { label: 'Время по возрастанию', value: 'time_asc' },
    { label: 'Время по убыванию', value: 'time_desc' },
  ];

  query = toSignal(this.route.queryParams.pipe(map((params) => params['q'])));
  categoryId = toSignal(
    this.route.queryParams.pipe(map((params) => params['c'])),
  );

  ads = toSignal<Ad[]>(
    this.route.queryParams.pipe(
      switchMap((params) =>
        this.business
          .getAds(params['q'], params['c'])
          .pipe(map((ads) => ads ?? [])),
      ),
    ),
  );

  filteredAndSortedAds = computed(() => {
    const sort = this.selectedSort();
    const min = this.minPrice() ?? 0;
    const max = this.maxPrice() ?? Infinity;

    const list = [...(this.ads() ?? [])].filter(
      (ad) => ad.cost >= min && ad.cost <= max,
    );

    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => a.cost - b.cost);
        break;
      case 'price_desc':
        list.sort((a, b) => b.cost - a.cost);
        break;
      case 'time_asc':
        list.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case 'time_desc':
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return list;
  });

  applyPriceFilter() {
    console.log('Фильтр по цене применён');
  }
}
