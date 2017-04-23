import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { SplitBillType } from './split-bill-type.enum';

@Component({
    selector: 'app-split-bill',
    templateUrl: './split-bill.component.html',
    styleUrls: ['./split-bill.component.css']
})
export class SplitBillComponent implements OnChanges {
    @Input() type: SplitBillType = SplitBillType.EQUAL;
    @Input() currency = 'USD';
    @Input() total = 0;
    @Output() participantChange = new EventEmitter();
    @Output() isValid = new EventEmitter();

    splitBillType = SplitBillType;
    billParticipants: Array<any> = [];

    @Input()
    get participants() {
        return this.billParticipants;
    }

    set participants(value) {
        this.billParticipants = value;
        this.participantChange.emit(this.billParticipants);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes.type && changes.type.currentValue !== changes.type.previousValue) {
            if (this.participants) {
                this.participants.forEach((participant) => {
                    participant.price = 0;
                });
            }
        }
        if (changes.total && changes.total.currentValue !== changes.total.previousValue) {
            let total = parseInt(changes.total.currentValue, 10);
            if (this.type === SplitBillType.EQUAL && this.participants) {
                this.participants.forEach((participant) => {
                    participant.price = this.total / this.participants.length;
                });
            }
        }
    }

    validatePrice(value) {
        if (this.type === SplitBillType.EQUAL) {
            this.isValid.emit(true);
            return;
        }
        this.isValid.emit(value && value > 0);
    }
}
