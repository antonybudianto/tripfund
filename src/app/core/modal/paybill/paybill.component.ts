import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../auth/user.model';

@Component({
    selector: 'app-paybill',
    templateUrl: './paybill.component.html',
    styleUrls: ['./paybill.component.css']
})
export class ModalPaybillComponent {
    modalData: any;
    modalSubject$: Subject<any>;
    totalBillingPay: string;
    submitted: boolean;
    isError: boolean;
    private modal: ModalDirective;
    private modalDefaultData: Object = {
        btnSave: 'Save',
        btnCancel: 'Cancel'
    };

    constructor(private afDb: AngularFireDatabase) {
        this.submitted = false;
        this.totalBillingPay = '';
    }

    boot(modal: ModalDirective, modalData: Object) {
        this.modal = modal;
        this.modalData = _.merge({}, this.modalDefaultData, modalData);
        this.modal.show();
    }

    handleSubmit(form: any) {
        let formValue = form.value;
        this.submitted = true;

        if (formValue.billing <= 0) {
            this.isError = true;
        } else {
            this.isError = false;
        }

        if (!form.valid) {
            return;
        }


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
