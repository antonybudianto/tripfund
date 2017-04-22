import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SplitButtonModule } from 'primeng/primeng';
import { ModalModule } from '../core/modal/modal.module';

@NgModule({
    imports: [
        SplitButtonModule,
        ModalModule,
        RouterModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
