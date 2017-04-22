import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './../core/sidebar/sidebar.component';
import { ModalModule } from '../core/modal/modal.module';
import { CardDetailModule } from './../core/card-detail/card-detail.module';
import { CardModule } from './../core/card/card.module';
import { SidebarModule } from './../core/sidebar/sidebar.module';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        DashboardRoutingModule,
        ModalModule,
        SidebarModule,
        CardModule,
        CardDetailModule
    ]
})
export class DashboardModule {}
