import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardDetailComponent } from './card-detail.component';

@NgModule({
    declarations: [
        CardDetailComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CardDetailComponent
    ]
})
export class CardDetailModule {
}
