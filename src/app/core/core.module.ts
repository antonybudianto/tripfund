import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFirebaseModule } from './firebase/app-firebase.module';
import { NavbarModule } from './navbar/navbar.module';
import { HeaderModule } from './header/header.module';
import { CardModule } from './card/card.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@NgModule({
    imports: [
        CommonModule,
        AppFirebaseModule,
        NavbarModule,
        HeaderModule,
        CardModule
    ],
    exports: [
        NavbarModule,
        HeaderModule,
        CardModule
    ],
    providers: [
        AuthService,
        AuthGuard
    ]
})
export class CoreModule {
}
