import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy,
    OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { User } from '../auth/user.model';
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
    user: User;
    favicon: any = require('../../../public/favicon.ico');
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private cd: ChangeDetectorRef,
                private toastrService: ToastsManager,
                private router: Router) {}

    ngOnInit() {
        this.subscriptions.push(
            this.authService.getUser$()
                .subscribe((user: User) => {
                    this.user = user;
                    this.cd.markForCheck();
                })
        );
    }

    changePassword() {
        this.authService.sendPasswordResetEmail(this.user.email)
            .then(
                _ => this.toastrService.success('Please check your email!.'),
                err => this.toastrService.error(err)
            );
    }

    logout() {
        this.authService.logout()
            .then(_ => this.router.navigate(['/']));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
