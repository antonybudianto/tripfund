import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TripService } from '../trip.service';
import { Trips } from '../../model/trips.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    trips: Array<Trips> =  [];
    loading = false;

    constructor(private tripService: TripService) {}

    ngOnInit() {
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
        console.log(trips.length);
    }

    handleClickCard(trip: any) {
        this.select.emit(trip);
    }
}
