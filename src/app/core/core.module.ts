import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFirebaseModule } from './firebase/app-firebase.module';
import { HeaderModule } from './header/header.module';
import { CardModule } from './card/card.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SigninService } from '../guest/signin/signin.service';

@NgModule({
    imports: [
        CommonModule,
        AppFirebaseModule,
        HeaderModule,
        CardModule
    ],
    exports: [
        HeaderModule,
        CardModule
    ],
    providers: [
        AuthService,
        SigninService,
        AuthGuard
    ]
})
export class CoreModule {
}
