import { Component, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { ModalAddTripComponent } from './../modal/add-trip/add-trip.component';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';
import { ModalConfig } from '../modal/modal.interface';
import * as uuid from 'uuid/v4';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [
        './sidebar.component.css'
    ],
})
export class SidebarComponent {
    @Output() afterAddTrip: EventEmitter<any> = new EventEmitter<any>();
    homeIcon = '/icons/home.png';
    private modalConfig: ModalConfig = {
        modalOptions: { backdrop: 'static' },
        modalData: {}
    };

    constructor(private router: Router,
        private authService: AuthService,
        private afDatabase: AngularFireDatabase,
        private modalService: ModalService,
        private cfr: ComponentFactoryResolver) {}

    logout() {
        this.authService.logout()
            .then(_ => this.router.navigate(['/']));
    }

    async saveTrip(data: any) {
        const { participants } = data;
        this.authService.getUser$()
        .take(1)
        .subscribe(async (user) => {
            participants.push(user);
            let tmp = participants.reduce((acc, curr) => {
                const { uid, name } = curr;
                acc[uuid()] = { uid, name };
                return acc;
            }, {});
            data.participants = participants;

            try {
                const result = await this.afDatabase.list('/trips')
                    .push({ participants: tmp });
                const tripId = result.key;
                this.saveTripMap(tripId, data);
            } catch (e) {
                console.log(e);
            }
        });
    }

    saveTripMap(tripId: string, data: any) {
        const { tripName, date, currency, participants } = data;
        let result = participants.reduce((acc, curr) => {
            acc[`/trip-maps/${curr.uid}/${uuid()}`] = {
                tripName, date, currency, tripId
            };
            return acc;
        }, {});

        this.afDatabase.object('/').update(result)
        .then(res => {
            this.afterAddTrip.emit();
        });
    }

    showAddTrip() {
        this.modalConfig.cfr = this.cfr;
        this.modalService.show(ModalAddTripComponent, this.modalConfig)
        .filter(result => result !== null)
        .subscribe((result: any) => {
            this.saveTrip(result);
        });
    }
}
