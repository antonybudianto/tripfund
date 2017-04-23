import { Component, Input } from '@angular/core';

import * as _ from 'lodash';

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
    @Input() currency = 'USD';
    user: User;

    constructor(private authService: AuthService) {
        this.authService.getUser$()
            .subscribe((user: User) => this.user = user);
    }

    isShow() {
        return this.tripDetails;
    }

    isIncludedInBill(bill) {
        return _.includes(_.map(bill.participants, 'uid'), this.user.uid);
    }
}
