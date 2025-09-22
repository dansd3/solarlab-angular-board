import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-ad-image',
  standalone: true,
  templateUrl: './ad-image.html',
  styleUrls: ['./ad-image.scss'],
})
export class AdImage {
  imageId = input<string | undefined>();
  imageStatus = signal<'success' | 'error'>('success');
  errorMessage = signal<string | null>(null);

  onImageError() {
    console.error('Image failed to load');
    this.imageStatus.set('error');
    this.errorMessage.set('Image failed to load');
  }
}
