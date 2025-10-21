import { Component, input, signal } from '@angular/core';
@Component({
  selector: 'app-ad-image',
  standalone: true,
  templateUrl: './ad-image.html',
  styleUrls: ['./ad-image.scss'],
})
export class AdImage {
  imageId = input<string | undefined>();
  imageStatus = signal<'success' | 'error' | 'no-image'>('success');
  errorMessage = signal<string | null>(null);
  onImageError(event: Event) {
    console.error('Image failed to load', event);
    this.imageStatus.set('error');
    this.errorMessage.set('Failed to load image');
  }
}
