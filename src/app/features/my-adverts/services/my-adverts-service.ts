import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MyAdvertsApi } from './my-adverts-api';
import { Ad } from '@/shared/types/ad';
@Injectable({
    providedIn: 'root'
})
export class MyAdvertsService {
    private api = inject(MyAdvertsApi);
    getAdverts(userId: string): Observable<Ad[]> {
        return this.api.getUser(userId).pipe(
            map((user) =>
                (user.adverts || []).map((ad) => ({
                    ...ad,
                    createdAt: new Date(ad.createdAt).toLocaleString(),
                }))
            )
        );
    }

}