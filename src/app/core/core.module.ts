import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardDetailModule } from './card-detail/card-detail.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingModule } from './loading/loading.module';
import { AppFirebaseModule } from './firebase/app-firebase.module';
import { HeaderModule } from './header/header.module';
import { CardModule } from './card/card.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SigninService } from '../guest/signin/signin.service';

@NgModule({
    imports: [
        CommonModule,
        AppFirebaseModule
    ],
    exports: [
        HeaderModule,
        CardModule,
        SidebarModule,
        CardDetailModule,
        LoadingModule
    ],
    providers: [
        AuthService,
        SigninService,
        AuthGuard
    ]
})
export class CoreModule {
}
