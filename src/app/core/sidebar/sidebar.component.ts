import { ModalAddTripComponent } from './../modal/add-trip/add-trip.component';
import { Router } from '@angular/router';
import { Component, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';
import { ModalConfig } from '../modal/modal.interface';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [
        './sidebar.component.css'
    ],
})
export class SidebarComponent {
    homeIcon = '/icons/home.png';
    private modalConfig: ModalConfig = {
        modalOptions: { backdrop: 'static' },
        modalData: {}
    };

    constructor(private router: Router,
        private authService: AuthService,
        private modalService: ModalService,
        private cfr: ComponentFactoryResolver) {}

    logout() {
        this.authService.logout()
            .then(_ => this.router.navigate(['/']));
    }

    showAddTrip() {
        this.modalConfig.cfr = this.cfr;
        this.modalService.show(ModalAddTripComponent, this.modalConfig)
            .subscribe((result: any) => {
                console.log(result);
            });
    }
}
