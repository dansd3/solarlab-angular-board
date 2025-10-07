import { Routes } from '@angular/router';
import { authGuard } from './infrastructure/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/features/advert-list/advert-list').then((m) => m.AdvertList),
  },
  {
    path: 'advert/:id',
    loadComponent: () =>
      import('@/features/advert-detail/advert-detail').then(
        (m) => m.AdvertDetail,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('@/features/personal-account/personal-account').then(
        (m) => m.PersonalAccount,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'my-adverts',
    loadComponent: () =>
      import('@/features/personal-account/personal-account').then(
        (m) => m.PersonalAccount,
      ),
    canActivate: [authGuard],
  },
];
