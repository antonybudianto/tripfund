import { Component, Input, OnChanges } from '@angular/core';

import { TripDetails } from '../../model/tripDetails.model';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnChanges {

    @Input() tripDetails: Array<any> = [];

    constructor() {
        console.log('constructor');
    }

    ngOnChanges() {
        console.log(this.tripDetails);
    }
}