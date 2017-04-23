import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { SplitBillType } from '../split-bill/split-bill-type.enum';
import { AngularFireDatabase } from 'angularfire2/database';
import { TripService } from '../../trip.service';

@Component({
    selector: 'app-modal-bill',
    templateUrl: './modal-bill.component.html',
    styleUrls: ['./modal-bill.component.css']
})
export class ModalBillComponent {
    modalData: any;
    modalSubject$: Subject<any>;
    splitBillType = SplitBillType;
    private tripId: string;
    private modal: ModalDirective;
    private modalDefaultData: Object = {
        btnSave: 'Save',
        btnCancel: 'Cancel'
    };

    constructor(private afDb: AngularFireDatabase,
        private tripService: TripService) {}

    boot(modal: ModalDirective, modalData: Object) {
        this.modal = modal;
        this.modalData = _.merge({}, this.modalDefaultData, modalData);
        this.tripId = this.modalData.tripId;
        this.tripService.fetchTripDetails(this.tripId)
            .take(1)
            .subscribe((tripDetail: any) => {
                console.log(tripDetail);
            });
        this.modal.show();
    }

    closeModal(result: boolean) {
        let subscription: Subscription = this.modal.onHidden.subscribe(() => {
            this.modalSubject$.next(result);
            this.modalSubject$.complete();
            subscription.unsubscribe();
        });
        this.modal.hide();
    }
}
