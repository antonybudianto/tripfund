import { Router } from '@angular/router';
import { Component, Input, ChangeDetectionStrategy, EventEmitter,
    OnDestroy, OnInit, ChangeDetectorRef, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../../auth/auth.service';
import { SigninService } from '../../../guest/signin/signin.service';

@Component({
    selector: 'app-navbar-login',
    templateUrl: './navbar-login.component.html',
    styleUrls: [
        './navbar-login.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarLoginComponent {
    @Input() brand: string;
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    isLoading: boolean;
    signInModel: any;
    private subscriptions: Subscription[] = [];

    constructor(private authService: AuthService,
                private signinService: SigninService,
                private router: Router) {
        this.isLoading = false;
        this.signInModel = {
            email: '',
            password: ''
        };
    }

    loginWithPassword(form: any) {
        let formValue = form.value;
        this.isLoading = true;

        this.authService.loginWithPassword(formValue.email, formValue.password)
            .then(
                result => this.router.navigate(['/dashboard']),
                err => {
                    form.reset();
                    this.router.navigate(['/signin'])
                        .then(res => this.signinService.setErrorMessage(err));
                }
            )
            .then(
                res => {
                    this.isLoading = false;
                    this.onClick.emit();
                }
            );
    }

    loginWithFacebook() {
        this.authService.loginWithFacebook();
        this.onClick.emit();
    }

    loginWithTwitter() {
        this.authService.loginWithTwitter();
        this.onClick.emit();
    }

    loginWithGoogle() {
        this.authService.loginWithGoogle();
        this.onClick.emit();
    }

    goToForgotPassword() {
        this.router.navigate(['/reset-password'])
            .then(res => this.onClick.emit());
    }
}
