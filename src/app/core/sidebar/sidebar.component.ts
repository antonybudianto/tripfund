import { ModalAddTripComponent } from './../modal/add-trip/add-trip.component';
import { Router } from '@angular/router';
import { Component, ComponentFactoryResolver } from '@angular/core';

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
                private modalService: ModalService,
                private cfr: ComponentFactoryResolver,
                private authService: AuthService) {
                    this.modalConfig.cfr = cfr;
                    this.showAddTrip();
                }

    logout() {
        this.authService.logout()
            .then(
                res => {
                    this.router.navigate(['/']);
                }
            );
    }

    showAddTrip() {
        this.modalService.show(ModalAddTripComponent, this.modalConfig)
        .subscribe((result: any) => {
            console.log(result);
        });
    }
}
