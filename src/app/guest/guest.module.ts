import { NgModule } from '@angular/core';

import { GuestRoutingModule } from './guest-routing.module';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [
        GuestRoutingModule
    ]
})
export class GuestModule {}
