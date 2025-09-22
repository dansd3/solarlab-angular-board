import { Routes } from '@angular/router';
import { AdvertList } from './features/advert-list/advert-list';
import { AdvertDetail } from './features/advert-detail/advert-detail';
import { PersonalAccount } from './features/personal-account/personal-account';
import { authGuard } from './infrastructure/stores/guards/auth/auth-guard';

export const routes: Routes = [
  { path: '', component: AdvertList },
  { path: 'advert/:id', component: AdvertDetail },
  { path: 'account', component: PersonalAccount, canActivate: [authGuard] }
];
