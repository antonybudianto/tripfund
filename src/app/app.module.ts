import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GuestModule } from './guest/guest.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';

import { AccordionModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        HomeModule,
        GuestModule,
        AppRoutingModule,
        AccordionModule
    ],
    bootstrap: [ AppComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
