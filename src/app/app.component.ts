import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';

import { MAIN } from './shared/constant/main';
import { LoadingService } from './core/loading/loading.service';

@Component({
    selector: 'app-main',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})
export class AppComponent {
    public appBrand: string;
    public isLoading: boolean;

    constructor(private router: Router,
                private loadingService: LoadingService) {
        this.appBrand = MAIN.APP.BRAND;

        router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.isLoading = true;
            }
            if (event instanceof NavigationEnd) {
                this.isLoading = false;
            }
            // this.navigationInterceptor(event);
        });
    }
}
