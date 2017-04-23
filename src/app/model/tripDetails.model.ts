import { Bills } from './bills.model';
import { Participants } from './participants.model';

export class TripDetails {

    constructor(
        public tripId: string,
        public bills: Bills,
        public participants: Participants
    ) {}
}
