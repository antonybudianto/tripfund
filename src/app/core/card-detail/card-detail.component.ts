import { Component, Input, OnChanges } from '@angular/core';

import { TripDetails } from '../../model/tripDetails.model';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnChanges {

    @Input() tripDetails: Array<TripDetails> = [];

    constructor() {
        console.log('constructor');
    }

    isShow() {
        return this.tripDetails.length > 0 && this.tripDetails[0].bills.length > 0;
    }

    ngOnChanges() {
        console.log(this.tripDetails);
    }
}
