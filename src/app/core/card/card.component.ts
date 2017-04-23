import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { CardField } from './card-field.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() field: CardField;
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    trips: Array<any> = [];
    loading = false;

    constructor(private afDb: AngularFireDatabase,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.fetch();
    }

    handleRefresh() {
        this.fetch();
    }

    fetch() {
        this.loading = true;
        this.authService.getAuth$()
        .switchMap((user: User) => {
            return this.afDb.list(`trip-details/${user.uid}`);
        })
        .take(1)
        .subscribe((trips: Array<any>) => {
            this.setTrips(trips);
        }, null, () => {
            this.loading = false;
        });
    }

    setTrips(trips: Array<any>) {
        this.trips = trips;
    }

    // getBillSum(bills: Array<any>) {
    //     return bills.reduce((acc, curr) => curr.total + acc, 0);
    // }

    // getParticipants(participants: Array<any>) {
    //     return participants
    //     .map(p => p.name).join(', ');
    // }

    handleClickCard(trip: any) {
        this.select.emit(trip);
    }

    selectData(field: CardField) {
        this.select.emit(field.id);
    }
}
