import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { Trips } from '../model/trips.model';
import { TripDetails } from '../model/tripDetails.model';
import { Observable } from 'rxjs';

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

    fetchTripDetails(tripId) {
        this.afDb.object(`trips/${tripId}`);
    }
}
