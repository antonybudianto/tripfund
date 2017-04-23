import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CardComponent } from './card.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
    declarations: [
        CardComponent
    ],
    imports: [
        SharedModule,
        ModalModule
    ],
    exports: [
        CardComponent
    ]
})
export class CardModule {
}
