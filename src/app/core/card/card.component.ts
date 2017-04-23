import { ModalBillComponent } from './../modal/modal-bill/modal-bill.component';
import { Component, OnInit, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';

import * as _ from 'lodash';

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

    @Output() select: EventEmitter<any> = new EventEmitter<any>();
    @Output() successAddBill: EventEmitter<any> = new EventEmitter<any>();

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

    handleClickCard(trip: any) {
        this.tripService.fetchTripDetails(trip.tripId)
            .map(tripDetails => {
                let tmp = tripDetails;
                tmp['bills'] = tripDetails['bills'] ? Object.values(tripDetails['bills']) : [];
                tmp['participants'] = tripDetails['participants'] ? Object.values(tripDetails['participants']) : [];
                tmp['bills'].forEach((bill) => {
                    bill.participants = Object.values(_.get(bill,  'participants'));
                });
                return tmp;
            })
            .take(1)
            .subscribe(tripDetails => {
                this.select.emit({
                    tripDetails: tripDetails,
                    currency: trip.currency
                });
            }, () => []);
    }

    saveBill(data: any) {
        this.tripService.saveBill(data)
        .then(res => {
            this.successAddBill.emit();
            this.handleClickCard(data.tripId);
        });
    }

    showAddBill(trip: any) {
        this.modalConfig.cfr = this.cfr;
        this.modalConfig.modalData.tripId = trip.tripId;
        this.modalConfig.modalData.currency = trip.currency;
        this.modalService.show(ModalBillComponent, this.modalConfig)
        .filter(result => result !== null)
        .subscribe((result: any) => {
            this.saveBill(result);
        });
    }
}
