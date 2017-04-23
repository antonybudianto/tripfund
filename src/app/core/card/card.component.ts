import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TripService } from '../trip.service';
import { Trips } from '../../model/trips.model';
import { TripDetails } from '../../model/tripDetails.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Output() select: EventEmitter<TripDetails> = new EventEmitter<TripDetails>();

    trips: Array<Trips> =  [];
    tripDetails: TripDetails;
    loading = false;

    constructor(private tripService: TripService) {}

    ngOnInit() {
        this.fetch();
    }

    handleRefresh() {
        this.fetch();
    }

    fetch() {
        this.loading = true;

        this.tripService.fetchTrips()
            .take(1)
            .subscribe((trips: Array<Trips>) => {
                this.setTrips(trips);
            }, null, () => {
                this.loading = false;
            });
    }

    setTrips(trips: Array<Trips>) {
        this.trips = trips;
    }

    handleClickCard(tripId: any) {
        this.tripService.fetchTripDetails(tripId)
            .map(tripDetails => {
                let tmp = tripDetails;
                tmp['bills'] = Object.values(tripDetails['bills']);
                tmp['participants'] = Object.values(tripDetails['participants']);
                return tmp;
            })
            .take(1)
            .subscribe(tripDetails => {
                console.log(tripDetails);
                this.setTripDetails(tripDetails);
            }, null);
    }

    setTripDetails(tripDetails) {
        this.select.emit(tripDetails);
    }
}
