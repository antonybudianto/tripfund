import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import {
    ModalModule as ModalBootstrapModule, TooltipModule,
    TabsModule, DatepickerModule
} from 'ngx-bootstrap';
import { MultiSelectModule } from 'primeng/primeng';

import { ModalPaybillComponent } from './paybill/paybill.component';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { ModalBillComponent } from './modal-bill/modal-bill.component';
import { SharedModule } from '../../shared/shared.module';
import { SplitBillComponent } from './split-bill/split-bill.component';
import { ModalAddTripComponent } from './add-trip/add-trip.component';
import { TripService } from '../trip.service';

@NgModule({
    imports: [
        SharedModule,
        ModalBootstrapModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        DatepickerModule.forRoot(),
        MultiSelectModule
    ],
    declarations: [
        ModalComponent,
        ModalBillComponent,
        SplitBillComponent,
        ModalAddTripComponent,
        ModalPaybillComponent
    ],
    exports: [
        ModalComponent,
        ModalBillComponent,
        SplitBillComponent,
        ModalAddTripComponent
    ],
    entryComponents: [
        ModalComponent,
        ModalBillComponent,
        ModalAddTripComponent,
        ModalPaybillComponent
    ],
    providers: [
        ModalService,
        TripService
    ]
})
export class ModalModule {
}
