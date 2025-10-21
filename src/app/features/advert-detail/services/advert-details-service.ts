import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AdvertApiService } from './advert-details-api-service';
import { AdDetail } from '@/shared/types/ad-detail';

@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  private api = inject(AdvertApiService);

  getAd(id: string): Observable<AdDetail> {
    return this.api.getById(id).pipe(
      map((ad) => ({
        ...ad,
        cost: ad.cost,
        created: new Date(ad.created).toLocaleString(),
        imagesIds: ad.imagesIds,
      })),
    );
  }
}
