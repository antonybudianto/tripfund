import { Component, Input, ComponentFactoryResolver } from '@angular/core';

import * as _ from 'lodash';
import { ToastsManager } from 'ng2-toastr';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
                private afDb: AngularFireDatabase,
                private modalService: ModalService,
                private toasts: ToastsManager,
                private cfr: ComponentFactoryResolver) {
        this.authService.getUser$()
            .subscribe((user: User) => this.user = user);
    }

    isShow() {
        return this.tripDetails;
    }

    isIncludedInBill(bill) {
        let ids = _.map(bill.participants, 'uid');
        let isIncluded = _.includes(ids, this.user.uid);
        if (isIncluded) {
            let selectedParticipant = _.find(bill.participants,
            (data: any) => {
                return data.uid === this.user.uid;
            });
            isIncluded = isIncluded && selectedParticipant.price > 0;
        }
        return isIncluded;
    }

    getMyBillingParticipant(bill) {
        return _.find(bill.participants, ['uid', this.user.uid]);
    }

    onHandlePaybill(bill) {
        const myBillingParticipant = this.getMyBillingParticipant(bill);
        this.modalConfig.modalData = {
            totalBill: myBillingParticipant['price']
        };
        this.modalConfig.cfr = this.cfr;
        this.modalService.show(ModalPaybillComponent, this.modalConfig)
            .filter(result => result.status)
            .subscribe((result: any) => {
                const urlObj = `trips/${this.tripId}/bills/${bill.billId}/participants`;
                this.afDb.list(urlObj)
                    .switchMap(
                        res => {
                            const myParticipant = _.find(res, ['uid', this.user.uid])['$key'];
                            return this.afDb.object(`${urlObj}/${myParticipant}`).update({
                                price: result.remainingBill
                            });
                        }
                    )
                    .take(1)
                    .subscribe(
                        _ => {
                            this.toasts.success('Success Paid Billing.');
                        },
                        err => {
                            this.toasts.error('Error Paid Billing.');
                        }
                    );
            });
    }
}
