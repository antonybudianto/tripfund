import { TripDetails } from './../../../model/tripDetails.model';
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
    data = {
        paidBy: '',
        billName: '',
        total: 0
    };
    tripDetail: TripDetails = new TripDetails();
    selectedTab = SplitBillType.EQUAL;
    submitted: boolean;
    isError: boolean;
    private tripId: string;
    private modal: ModalDirective;
    private modalDefaultData: Object = {
        btnSave: 'Save',
        btnCancel: 'Cancel'
    };
    private tabs = {
        'Split Equally': SplitBillType.EQUAL,
        'Split By Amounts': SplitBillType.AMOUNT
    };
    private isValidAmount = true;

    constructor(private afDb: AngularFireDatabase,
        private tripService: TripService) { }

    boot(modal: ModalDirective, modalData: Object) {
        this.modal = modal;
        this.modalData = _.merge({}, this.modalDefaultData, modalData);
        this.tripId = this.modalData.tripId;
        this.tripService.fetchTripDetails(this.tripId)
            .map(tripDetails => {
                let tmp = tripDetails;
                tmp['bills'] = tripDetails['bills'] ? Object.values(tripDetails['bills']) : [];
                tmp['participants'] = tripDetails['participants'] ?
                    Object.values(tripDetails['participants']) : [];
                return tmp;
            })
            .take(1)
            .subscribe((tripDetail: TripDetails) => {
                this.tripDetail = tripDetail;
                this.data.paidBy = this.tripDetail.participants[0].name;
                this.modal.show();
            });
    }

    closeModal(result: boolean) {
        let bill = {
            tripId: this.tripDetail['$key'],
            billName: this.data.billName,
            total: this.data.total,
            paidBy: this.data.paidBy,
            participants: this.tripDetail.participants
        };
        let subscription: Subscription = this.modal.onHidden.subscribe(() => {
            this.modalSubject$.next(result ? bill : null);
            this.modalSubject$.complete();
            subscription.unsubscribe();
        });
        this.modal.hide();
    }

    selectTab(value) {
        this.selectedTab = this.tabs[value.heading] || this.selectedTab;
    }

    isValid(value: boolean) {
        this.isValidAmount = value;
    }

    handleSubmit(form: any) {
        let formValue = form.value;
        this.submitted = true;

        if (!formValue.billName || !formValue.total || !this.isValidAmount) {
            return;
        }

        this.closeModal(true);
    }
}
