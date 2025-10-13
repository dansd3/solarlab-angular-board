import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchHeaderApi } from './search-header-api-service';
@Injectable({
  providedIn: 'root',
})
export class SearchHeaderService {
  private api = inject(SearchHeaderApi);
  getName(id: string): Observable<string> {
    return this.api.getById(id).pipe(map((res) => res.name));
  }
}
