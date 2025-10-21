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
    path: 'my-adverts',
    loadComponent: () =>
      import('@/features/my-adverts/my-adverts').then(
        (m) => m.MyAdverts,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('@/features/search-list/search-list').then((m) => m.SearchList),
  },
  {
    path: 'new-advert',
    loadComponent: () =>
      import('@/features/new-advert/new-advert').then((m) => m.NewAdvert),
    canActivate: [authGuard],
  },
    {
    path: 'settings',
    loadComponent: () =>
      import('@/features/settings/settings').then((m) => m.Settings),
    canActivate: [authGuard],
  },
];
