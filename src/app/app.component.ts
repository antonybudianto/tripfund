import { Component, ViewContainerRef } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
                private loadingService: LoadingService,
                private toastrsManager: ToastsManager,
                private vcr: ViewContainerRef) {
        this.appBrand = MAIN.APP.BRAND;
        this.toastrsManager.setRootViewContainerRef(vcr);

        router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.isLoading = true;
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
                this.isLoading = false;
            }
        });
    }
}
