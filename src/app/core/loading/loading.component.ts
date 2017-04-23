import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: [
        './loading.component.css'
    ]
})

export class LoadingComponent implements OnInit, OnDestroy {
    @Input() isLoading: boolean;
    loadingSubscription: Subscription;

    constructor(private loadingService: LoadingService) {}

    ngOnInit() {
        this.loadingSubscription = this.loadingService.observable.subscribe(
            result => {
                this.isLoading = result;
            }
        );
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }
}
