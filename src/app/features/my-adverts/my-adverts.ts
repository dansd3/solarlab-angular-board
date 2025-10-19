import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MyAdvertsService } from './services/my-adverts-service';
import { UserStore } from '@/infrastructure/stores/auth/user-store';
import { AdCard } from '@/shared/components/ad-card/ad-card';
import { Router } from '@angular/router';
@Component({
    selector: 'app-my-adverts',
    standalone: true,
    imports: [CommonModule, AdCard],
    templateUrl: './my-adverts.html',
    styleUrls: ['./my-adverts.scss']
})
export class MyAdverts {
    private business = inject(MyAdvertsService);
    private userStore = inject(UserStore);
    private router = inject(Router);
    user = this.userStore.user;
    ads = toSignal(this.business.getAdverts(this.user()?.id ?? ''), { initialValue: [] });
    navigateToNewAdvert() {
        this.router.navigate(['/new-advert']);
    }
}