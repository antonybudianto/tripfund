import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../auth/user.model';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.css']
})
export class ModalAddTripComponent {
    modalData: any;
    modalSubject$: Subject<any>;
    data = {
        date: new Date(),
        currency: 'USD',
        tripName: '',
        participants: []
    };
    users = [];
    private modal: ModalDirective;
    private modalDefaultData: Object = {
        btnSave: 'Save',
        btnCancel: 'Cancel'
    };

    constructor(private afDb: AngularFireDatabase) { }

    boot(modal: ModalDirective, modalData: Object) {
        this.modal = modal;
        this.modalData = _.merge({}, this.modalDefaultData, modalData);
        this.afDb.list('users').subscribe((users: Array<User>) => {
            this.users = _.map(users, (user) => {
                return {
                    label: user.name,
                    value: {
                        uid: user.uid,
                        name: user.name
                    }
                };
            });
            this.modal.show();
        });
    }

    closeModal(result: boolean) {
        let trip = {
            tripName: this.data.tripName,
            date: this.data.date.toDateString(),
            currency: this.data.currency,
            participants: this.data.participants
        };
        let subscription: Subscription = this.modal.onHidden.subscribe(() => {
            this.modalSubject$.next(result ? trip : null);
            this.modalSubject$.complete();
            subscription.unsubscribe();
        });
        this.modal.hide();
    }
}
