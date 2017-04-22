import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { SplitButtonModule } from 'primeng/primeng';
import { ModalModule } from '../core/modal/modal.module';

@NgModule({
    imports: [
        SplitButtonModule,
        ModalModule
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
