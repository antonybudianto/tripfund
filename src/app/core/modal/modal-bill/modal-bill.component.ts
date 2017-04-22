import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
    selector: 'app-modal-bill',
    templateUrl: './modal-bill.component.html',
    styleUrls: ['./modal-bill.component.css']
})
export class ModalBillComponent {
    modalData: any;
    modalSubject$: Subject<any>;
    private modal: ModalDirective;
    private modalDefaultData: Object = {
        btnSave: 'Save',
        btnCancel: 'Cancel'
    };

    boot(modal: ModalDirective, modalData: Object) {
        this.modal = modal;
        this.modalData = _.merge({}, this.modalDefaultData, modalData);
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
