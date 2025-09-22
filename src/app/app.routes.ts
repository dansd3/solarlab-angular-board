import { Routes } from '@angular/router';
import { AdvertList } from './features/advert-list/advert-list';
import { AdvertDetail } from './features/advert-detail/advert-detail';

export const routes: Routes = [
  { path: '', component: AdvertList },
  { path: 'advert/:id', component: AdvertDetail },
];
