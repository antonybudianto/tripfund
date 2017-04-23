import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardDetailComponent } from './card-detail.component';
import { UniquePipe } from '../unique.pipe';

@NgModule({
    declarations: [
        CardDetailComponent,
        UniquePipe
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
