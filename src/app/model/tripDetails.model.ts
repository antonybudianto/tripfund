import { Bills } from './bills.model';
import { Participants } from './participants.model';

export class TripDetails {

    constructor(
        public bills: Array<Bills> = null,
        public participants: Array<Participants> = null
    ) {}
}
