import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { AdvertService } from './services/advert-details-service';
import { AdDetail } from '@/shared/types/ad-detail';

@Component({
  selector: 'app-advert-detail',
  standalone: true,
  imports: [CommonModule],
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
}
