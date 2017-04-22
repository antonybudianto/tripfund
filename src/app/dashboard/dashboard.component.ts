import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../core/auth/user.model';
import { AuthService } from '../core/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.css'
    ]
})
export class DashboardComponent implements OnInit {

    trips: Array<any> = [];
    loading = false;

    constructor(private afDb: AngularFireDatabase,
                private authService: AuthService) {}

    ngOnInit() {
        this.loading = true;
        this.authService.getAuth$()
        .switchMap((user: User) => {
            return this.afDb.list(`trips/${user.uid}`);
        })
        .take(1)
        .subscribe((trips: Array<any>) => {
            this.setTrips(trips);
            console.log(trips);
        }, null, () => {
            this.loading = false;
        });
    }

    setTrips(trips: Array<any>) {
        this.trips = trips.map(t => {
            t.bills = Object.values(t.bills);
            t.participants = Object.values(t.participants);
            return t;
        });
    }

    getBillSum(bills: Array<any>) {
        return bills.reduce((acc, curr) => curr.total + acc, 0);
    }

    getParticipants(participants: Array<any>) {
        return participants
        .map(p => p.name).join(', ');
    }
}
