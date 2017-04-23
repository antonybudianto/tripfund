import { ModalBillComponent } from './../modal/modal-bill/modal-bill.component';
import { Component, OnInit, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';

import { TripService } from '../trip.service';
import { Trips } from '../../model/trips.model';
import { TripDetails } from '../../model/tripDetails.model';
import { ModalService } from '../modal/modal.service';
import { ModalConfig } from '../modal/modal.interface';

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
    private modalConfig: ModalConfig = {
        modalOptions: { backdrop: 'static' },
        modalData: {}
    };

    constructor(private tripService: TripService,
        private modalService: ModalService,
        private cfr: ComponentFactoryResolver) {}

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

    showAddBill(id: string) {
        this.modalConfig.cfr = this.cfr;
        this.modalConfig.modalData.tripId = id;
        this.modalService.show(ModalBillComponent, this.modalConfig)
        .subscribe((result: any) => {
            console.log(result);
        });
    }
}
