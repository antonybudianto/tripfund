import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HeaderComponent } from './header.component';
import { NavbarLoginComponent } from './login/navbar-login.component';

@NgModule({
    declarations: [
        HeaderComponent,
        NavbarLoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        BsDropdownModule.forRoot()
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}
