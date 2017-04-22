import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NavbarComponent } from './navbar.component';
import { NavbarLoginComponent } from './login/navbar-login.component';

@NgModule({
    declarations: [
        NavbarComponent,
        NavbarLoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        BsDropdownModule.forRoot()
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {
}
