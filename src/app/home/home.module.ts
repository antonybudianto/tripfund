import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SplitButtonModule } from 'primeng/primeng';

@NgModule({
    imports: [
        RouterModule,
        SplitButtonModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
