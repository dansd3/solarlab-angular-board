import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { AdvertService } from './services/advert-details-service';
import { AdDetail } from '@/shared/types/ad-detail';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { Breadcrumbs } from './components/breadcrumbs/breadcrumbs';
import { environment } from '@/environments/environment';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-advert-detail',
  standalone: true,
  imports: [CommonModule, GalleriaModule, DialogModule, ButtonModule, Breadcrumbs,],
  templateUrl: './advert-detail.html',
  styleUrls: ['./advert-detail.scss'],
})
export class AdvertDetail {
  private route = inject(ActivatedRoute);
  private service = inject(AdvertService);
  ad = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => this.service.getAd(params.get('id')!)),
    ),
    { initialValue: {} as AdDetail },
  );
  displayPhoneModal = signal(false);
  images = computed(() => this.ad().imagesIds?.map(id => ({ itemImageSrc: `${environment.baseUrl}/Images/${id}`, thumbnailImageSrc: `${environment.baseUrl}/Images/${id}` })) || []);
  formattedPhone = computed(() => {
    const phone = this.ad().phone;
    if (phone && phone.length === 11) {
      return `+7(${phone.slice(1, 4)}) ${phone.slice(4, 7)} -${phone.slice(7, 9)} -${phone.slice(9)}`;
    }
    return phone;
  });
  mapLink = computed(() => `https://google.com/maps/search/${encodeURIComponent(this.ad().location || '')}`);
  showPhoneModal() {
    this.displayPhoneModal.set(true);
  }
}