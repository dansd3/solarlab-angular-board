import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ad } from '@/shared/types/ad';
import { AdImage } from '@/shared/components/ad-image/ad-image';
import { PricePipe } from '@/shared/pipes/price-pipe';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule, RouterLink, AdImage, PricePipe],
  templateUrl: './ad-card.html',
  styleUrls: ['./ad-card.scss'],
})
export class AdCard {
  ad = input.required<Ad>();
}
