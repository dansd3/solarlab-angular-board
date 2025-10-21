import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdDetail } from '@/shared/types/ad-detail';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertApiService {
  private http = inject(HttpClient);

  getById(id: string): Observable<AdDetail> {
    return this.http.get<AdDetail>(`${environment.baseUrl}/Advert/${id}`);
  }
}
