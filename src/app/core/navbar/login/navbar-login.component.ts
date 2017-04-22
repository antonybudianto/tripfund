import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy, EventEmitter,
    OnDestroy, OnInit, ChangeDetectorRef, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../../auth/auth.service';

@Component({
    selector: 'app-navbar-login',
    templateUrl: './navbar-login.component.html',
    styleUrls: [
        './navbar-login.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarLoginComponent implements OnDestroy, OnInit {
    @Input() brand: string;
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    isLoading: boolean;
    signInModel: any;
    user: any;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private cd: ChangeDetectorRef,
                private router: Router) {
        this.isLoading = false;
        this.signInModel = {
            email: '',
            password: ''
        };
    }

    ngOnInit() {
        this.subscriptions.push(
            this.authService.getAuth$()
            .subscribe(user => {
                this.user = user;
                this.cd.markForCheck();
            })
        );
    }

    loginWithPassword(form: any) {
        let formValue = form.value;
        this.isLoading = true;

        this.authService.loginWithPassword(formValue.email, formValue.password)
            .then(
                result => {
                    this.router.navigate(['/dashboard']);
                },
                err => {
                    this.router.navigate(['/dashboard']);
                }
            );
    }

    loginWithFacebook() {
        this.authService.loginWithFacebook();
        this.onClick.emit();
    }

    loginWithGoogle() {
        this.authService.loginWithGoogle();
        this.onClick.emit();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
