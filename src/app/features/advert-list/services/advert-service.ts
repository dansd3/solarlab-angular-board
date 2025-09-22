import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdvertApiService } from './advert-api-service';
import { Ad } from '@/shared/types/ad';

@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  private api = inject(AdvertApiService);

  getAds(search = '', showNonActive = true): Observable<Ad[]> {
    return this.api.search({ search, showNonActive }).pipe(
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
