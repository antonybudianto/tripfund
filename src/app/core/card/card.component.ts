import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CardField } from './card-field.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() field: CardField;
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    selectData(field: CardField) {
        this.select.emit(field.id);
    }
}