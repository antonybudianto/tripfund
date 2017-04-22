import { ModalBillComponent } from './../core/modal/modal-bill/modal-bill.component';
import { Component, ComponentFactoryResolver } from '@angular/core';

import { ModalService } from '../core/modal/modal.service';
import { ModalConfig } from '../core/modal/modal.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css'
    ]
})
export class HomeComponent {
    private modalConfig: ModalConfig = {
        modalOptions: { backdrop: 'static' },
        modalData: {}
    };

    constructor(private modalService: ModalService,
        private cfr: ComponentFactoryResolver) {
        this.cfr = cfr;
    }

    test() {
        this.modalService.show(ModalBillComponent, this.modalConfig)
            .subscribe((result) => {
                console.log(result);
            });
    }
}
