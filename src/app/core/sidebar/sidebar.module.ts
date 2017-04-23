import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
    declarations: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ModalModule
    ],
    exports: [
        SidebarComponent
    ]
})
export class SidebarModule {
}
