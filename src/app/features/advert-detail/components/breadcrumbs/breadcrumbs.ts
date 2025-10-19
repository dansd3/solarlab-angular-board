import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService } from './services/breadcrumbs-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of, switchMap } from 'rxjs';
import { Category } from '@/shared/types/category';

interface BreadcrumbItem {
  id: string;
  name: string;
}
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.html',
  styleUrls: ['./breadcrumbs.scss'],
})
export class Breadcrumbs {
  categoryId = input.required<string>();
  private categoriesBusiness = inject(BreadcrumbsService);
  breadcrumbs = toSignal<BreadcrumbItem[]>(
    this.categoriesBusiness
      .getAll()
      .pipe(
        switchMap((categories) =>
          this.buildBreadcrumb(categories, this.categoryId()),
        ),
      ),
  );
  private buildBreadcrumb(
    categories: Category[],
    id: string,
  ): Observable<BreadcrumbItem[]> {
    const chain: BreadcrumbItem[] = [];
    let currentId = id;
    while (currentId && currentId !== '00000000-0000-0000-0000-000000000000') {
      const cat = categories.find((c) => c.id === currentId);
      if (cat) {
        chain.unshift({ id: cat.id, name: cat.name });
        currentId = cat.parentId;
      } else {
        break;
      }
    }
    return of(chain);
  }
}
