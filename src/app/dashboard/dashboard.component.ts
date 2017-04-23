import { Component } from '@angular/core';

import { TripDetails } from '../model/tripDetails.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.css'
    ]
})
export class DashboardComponent {
    tripDetails: Array<TripDetails> = [];

    handleCardSelect(tripDetails: Array<TripDetails>) {
        this.tripDetails = tripDetails;
    }
}
