import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.css'
    ]
})
export class DashboardComponent {
    bills: Array<any> = [];

    handleCardSelect(bills: Array<any>) {
        this.bills = bills;
    }
}
