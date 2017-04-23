import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import {
    ModalModule as ModalBootstrapModule, TooltipModule,
    TabsModule, DatepickerModule
} from 'ngx-bootstrap';
import { MultiSelectModule } from 'primeng/primeng';

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
        ModalAddTripComponent
    ],
    exports: [
        ModalComponent,
        ModalBillComponent,
        SplitBillComponent,
        ModalAddTripComponent
    ],
    providers: [
        ModalService,
        TripService,
        {
            provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [
                ModalComponent,
                ModalBillComponent,
                ModalAddTripComponent
            ], multi: true
        }
    ]
})
export class ModalModule {
}
