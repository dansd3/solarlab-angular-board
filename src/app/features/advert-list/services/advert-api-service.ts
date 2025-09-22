import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from '@/shared/types/ad';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertApiService {
  private http = inject(HttpClient);

  search(body: { search: string; showNonActive: boolean }): Observable<Ad[]> {
    return this.http.post<Ad[]>(`${environment.baseUrl}/Advert/search`, body);
  }
}
