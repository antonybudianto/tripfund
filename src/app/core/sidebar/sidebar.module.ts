import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ModalModule
    ],
    declarations: [
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ]
})
export class SidebarModule {
}
