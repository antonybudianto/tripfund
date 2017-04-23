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
    tripDetails: TripDetails;
    currency: string;
    tripId: string;

    handleCardSelect(data: any) {
        this.tripDetails = data.tripDetails;
        this.currency = data.currency;
        this.tripId = data.tripId;
    }
}
