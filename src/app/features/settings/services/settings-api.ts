import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
interface UserUpdateResponse {
    id: string;
    name: string;
    login: string;
}
@Injectable({
    providedIn: 'root'
})
export class SettingsApi {
    private http = inject(HttpClient);
    updateUser(id: string, name: string, login: string, password: string): Observable<UserUpdateResponse> {
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Login', login);
        formData.append('Password', password);
        return this.http.put<UserUpdateResponse>(`${environment.baseUrl}/Users/${id}`, formData);
    }
}