import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy,
    OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input() brand: string;
    user: any;
    favicon: any = require('../../../public/favicon.ico');
    loading = false;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private cd: ChangeDetectorRef,
                private router: Router) {}

    ngOnInit() {
        this.loading = true;
        this.subscriptions.push(
            this.authService.getAuth$()
            .subscribe(user => {
                this.loading = false;
                this.user = user;
                this.cd.markForCheck();
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
