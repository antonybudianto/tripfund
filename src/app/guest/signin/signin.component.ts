import { OnInit, OnDestroy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SigninService } from './signin.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: [
        './signin.component.css'
    ]
})
export class SignInComponent implements OnDestroy, OnInit {
    signInModel: any;
    submitted: boolean;
    errorMessage: string;
    isLoading: boolean;
    signinSubscription: Subscription;

    constructor(private authService: AuthService,
                private signinService: SigninService,
                private router: Router,
                private route: ActivatedRoute) {
        this.submitted = false;
        this.isLoading = false;
        this.signInModel = {
            email: '',
            password: ''
        };
    }

    ngOnInit() {
        this.signinSubscription = this.signinService.getErrorMessage()
            .subscribe(res => this.errorMessage = res.message);
    }

    ngOnDestroy() {
        this.signinSubscription.unsubscribe();
    }

    handleSubmit(form: any) {
        let formValue = form.value;
        this.submitted = true;

        if (!form.valid) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.authService
            .loginWithPassword(formValue.email, formValue.password)
            .then(res => {
                this.router.navigate(['/dashboard']);
            }, err => this.errorMessage = err.message)
            .then(() => {
                this.isLoading = false;
            });
    }

    handleSuccessLogin() {
        this.router.navigate(['/dashboard']);
    }
}
