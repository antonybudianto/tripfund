import { Component, Input } from '@angular/core';

import { TripDetails } from '../../model/tripDetails.model';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent {

    @Input() tripDetails: TripDetails;

    isShow() {
        return this.tripDetails && this.tripDetails.bills.length > 0;
    }
}
