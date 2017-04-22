import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

    @Input() bills: Array<any> = [];

    constructor() {
        console.log('card component constructor');
    }

    ngOnInit() {
        console.log('card component onInit');
    }
}
