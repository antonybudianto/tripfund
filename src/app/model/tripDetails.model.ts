import { Bills } from './bills.model';
import { Participants } from './participants.model';

export class TripDetails {

    constructor(
        public tripId: string,
        public bills: Array<Bills>,
        public participants: Array<Participants>
    ) {}
}
