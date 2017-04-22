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
export class HeaderComponent {
    @Input() brand: string;
    user: any;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private cd: ChangeDetectorRef,
                private router: Router) {}
}
