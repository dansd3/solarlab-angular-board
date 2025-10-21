import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { User } from '@/shared/types/user';
@Injectable({
    providedIn: 'root'
})
export class MyAdvertsApi {
    private http = inject(HttpClient);
    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${environment.baseUrl}/Users/${id}`);
    }
}