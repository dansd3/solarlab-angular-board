import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdCard } from './components/ad-card/ad-card';
import { AdvertService } from './services/advert-service';
import { Ad } from '@/shared/types/ad';

@Component({
  selector: 'app-advert-list',
  standalone: true,
  imports: [CommonModule, AdCard],
  templateUrl: './advert-list.html',
  styleUrls: ['./advert-list.scss'],
})
export class AdvertList {
  private service = inject(AdvertService);
  ads = toSignal(this.service.getAds(), { initialValue: [] as Ad[] });
}
