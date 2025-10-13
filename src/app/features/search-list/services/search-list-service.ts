import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchListApi } from './search-list-api-service';
import { Ad } from '@/shared/types/ad';
@Injectable({
  providedIn: 'root',
})
export class SearchListService {
  private api = inject(SearchListApi);
  getAds(search?: string, category?: string): Observable<Ad[]> {
    const body: { search?: string; category?: string; showNonActive: boolean } =
      { showNonActive: true };
    if (search) body.search = search;
    if (category) body.category = category;
    return this.api.search(body).pipe(
      map((ads) =>
        ads.map((ad) => ({
          ...ad,
          cost: ad.cost,
          createdAt: new Date(ad.createdAt).toLocaleString(),
        })),
      ),
    );
  }
}
