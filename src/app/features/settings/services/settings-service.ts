import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsApi } from './settings-api';
interface UserUpdateResponse {
    id: string;
    name: string;
    login: string;
}
@Injectable({
    providedIn: 'root'
})
export class SettingsBusiness {
    private api = inject(SettingsApi);
    updateUser(id: string, name: string, login: string, password: string): Observable<UserUpdateResponse> {
        return this.api.updateUser(id, name, login, password);
    }
}