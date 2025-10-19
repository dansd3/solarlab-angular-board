import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '@/shared/types/category';
import { environment } from '@/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoriesApi {
  private http = inject(HttpClient);
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/Categories`);
  }
}
