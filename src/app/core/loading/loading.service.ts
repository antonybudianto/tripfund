import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {
    private subject$: Subject<boolean> = new Subject<boolean>();

    constructor() {
        console.log('Loading Service');
    }

    setLoading(value: boolean) {
        this.subject$.next(value);
    }

    get observable(): Observable<boolean> {
        return this.subject$.asObservable();
    }
}
