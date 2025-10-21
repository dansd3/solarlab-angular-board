import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoriesApi } from './categories-list-api';
import { Category } from '@/shared/types/category';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private api = inject(CategoriesApi);
  getCategoriesTree(): Observable<Category[]> {
    return this.api.getAll().pipe(
      map((categories) => {
        const tree: Category[] = [];
        const map = new Map<string, Category>();
        categories.forEach((cat) => {
          map.set(cat.id, { ...cat, childs: [] });
        });
        categories.forEach((cat) => {
          if (cat.parentId === '00000000-0000-0000-0000-000000000000') {
            tree.push(map.get(cat.id)!);
          } else {
            const parent = map.get(cat.parentId);
            if (parent) {
              parent.childs!.push(map.get(cat.id)!);
            }
          }
        });
        return tree;
      }),
    );
  }
}
