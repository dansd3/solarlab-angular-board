import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CreateAdvertApi {
  private http = inject(HttpClient);
  create(formData: FormData): Observable<unknown> {
    return this.http.post(`${environment.baseUrl}/Advert`, formData);
  }
}
