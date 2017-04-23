import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as uuid from 'uuid/v4';

import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { Trips } from '../model/trips.model';
import { TripDetails } from '../model/tripDetails.model';

@Injectable()
export class TripService {

    constructor(private authService: AuthService,
                private afDb: AngularFireDatabase) {}

    fetchTrips(): Observable<any> {
        return this.authService.getAuth$()
            .switchMap((user: User) => {
                return this.afDb.list(`trip-maps/${user.uid}`);
            });
    }

    fetchTripDetails(tripId): Observable<any> {
        return this.afDb.object(`trips/${tripId}`);
    }

    saveBill(data: any) {
        const { tripId, billName, paidBy, total, participants } = data;
        let participantsMap = participants.reduce((acc, curr) => {
            const { name, price, uid } = curr;
            acc[uuid()] = { name, price, uid };
            return acc;
        }, {});

        return this.afDb.list(`/trips/${tripId}/bills`)
        .push({ billName, paidBy, total, participants: participantsMap});
    }
}
