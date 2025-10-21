import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'objectUrl',
  standalone: true,
})
export class ObjectUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(value));
  }
}
