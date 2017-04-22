import { Component, OnInit, Input } from '@angular/core';
import { SplitBillType } from './split-bill-type.enum';

@Component({
    selector: 'app-split-bill',
    templateUrl: './split-bill.component.html',
    styleUrls: ['./split-bill.component.css']
})
export class SplitBillComponent {
    @Input() type: SplitBillType = SplitBillType.EQUAL;
    @Input() participants: Array<any> = [];
}
