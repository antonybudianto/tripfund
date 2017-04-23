import { Participants } from './participants.model';

export class Bills {

    constructor(
        public billName: string,
        public billDate: string,
        public method: string,
        public paidBy: string,
        public total: number,
        public participants: Array<Participants>
    ) {}
}
