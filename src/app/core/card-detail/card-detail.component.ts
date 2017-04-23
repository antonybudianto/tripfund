import { Component, Input, ComponentFactoryResolver } from '@angular/core';

import * as _ from 'lodash';

import { ModalPaybillComponent } from '../modal/paybill/paybill.component';
import { ModalService } from '../modal/modal.service';
import { ModalConfig } from '../modal/modal.interface';
import { TripDetails } from '../../model/tripDetails.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent {
    @Input() tripDetails: TripDetails;
    @Input() tripId: string;
    @Input() currency = 'USD';
    user: User;
    private modalConfig: ModalConfig = {
        modalOptions: { backdrop: 'static' },
        modalData: {}
    };


    constructor(private authService: AuthService,
                private modalService: ModalService,
                private cfr: ComponentFactoryResolver) {
        this.authService.getUser$()
            .subscribe((user: User) => this.user = user);
    }

    isShow() {
        return this.tripDetails;
    }

    isIncludedInBill(bill) {
        return _.includes(_.map(bill.participants, 'uid'), this.user.uid);
    }

    getPrice(bill) {
        const result = _.find(bill.participants, ['uid', this.user.uid]);
        return result['price'];
    }

    onHandlePaybill(bill) {
        this.modalConfig.modalData = {
            totalBill: this.getPrice(bill)
        };
        this.modalConfig.cfr = this.cfr;
        this.modalService.show(ModalPaybillComponent, this.modalConfig)
            .filter(result => result.status)
            .subscribe((result: any) => {
                const payload = {
                    uid: this.user.uid,
                    tripId: this.tripId,
                    price: result
                };
            });
    }
}
