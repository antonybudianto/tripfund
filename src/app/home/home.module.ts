import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { SplitButtonModule } from 'primeng/primeng';

@NgModule({
    imports: [
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
