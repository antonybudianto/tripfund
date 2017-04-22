import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

class ErrorData {
    constructor(public message: string) {}
}

@Injectable()
export class SigninService {
    private subject$: Subject<ErrorData> = new Subject<ErrorData>();

    setErrorMessage(error: ErrorData) {
        this.subject$.next(error);
    }

    getErrorMessage(): Observable<ErrorData> {
        return this.subject$.asObservable();
    }
}
