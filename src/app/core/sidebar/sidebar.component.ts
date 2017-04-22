import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [
        './sidebar.component.css'
    ],
})
export class SidebarComponent {

    homeIcon: any = require('../../../public/icons/home.png');

    constructor(private router: Router) {}
}
