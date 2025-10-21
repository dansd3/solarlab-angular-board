import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbsApi } from './breadcrumbs-api';
import { Category } from '@/shared/types/category';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private api = inject(BreadcrumbsApi);
  getAll(): Observable<Category[]> {
    return this.api.getAll();
  }
}
