import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesApi } from './categories-api';
import { Category } from '@/shared/types/category';
@Injectable({
  providedIn: 'root',
})
export class CategoriesBusiness {
  private api = inject(CategoriesApi);
  getAll(): Observable<Category[]> {
    return this.api.getAll();
  }
}
