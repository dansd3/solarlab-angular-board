import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateAdvertApi } from './create-advert-api';
import { CategoriesBusiness } from '@/infrastructure/services/categories/categories-service';
import { Category } from '@/shared/types/category';

export interface CategoryDropdownNode {
  label: string;
  value: string;
  children: CategoryDropdownNode[];
}


@Injectable({
    providedIn: 'root',
})
export class CreateAdvertBusiness {
    private api = inject(CreateAdvertApi);
    private categoriesBusiness = inject(CategoriesBusiness);
    getCategories(): Observable<CategoryDropdownNode[]> {
        return this.categoriesBusiness
            .getAll()
            .pipe(
                map((categories: Category[]) => this.buildDropdownOptions(categories)),
            );
    }

    private buildDropdownOptions(
        categories: Category[],
        parentId = '00000000-0000-0000-0000-000000000000',
        level = 0,
    ): CategoryDropdownNode[] {
        return categories
            .filter((cat) => cat.parentId === parentId)
            .map((cat) => ({
                label: '-'.repeat(level) + ' ' + cat.name,
                value: cat.id,
                children: this.buildDropdownOptions(categories, cat.id, level + 1),
            }));
    }
    createAdvert(
        data: {
            name: string;
            description: string;
            location: string;
            cost: number;
            email: string;
            phone: string;
            images: File[];
        },
        categoryId: string,
    ): Observable<unknown> {
        const formData = new FormData();
        formData.append('Name', data.name);
        formData.append('Description', data.description);
        formData.append('Cost', data.cost.toString());
        formData.append('Phone', data.phone);
        formData.append('Location', data.location);
        formData.append('CategoryId', categoryId);
        data.images.forEach((file) => {
            formData.append('Images', file);
        });

        return this.api.create(formData);
    }
}
