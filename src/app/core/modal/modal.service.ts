import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ModalDispatchComponent, ModalConfig } from './modal.interface';

@Injectable()
export class ModalService {
  subject$: Subject<ModalDispatchComponent> = new Subject<ModalDispatchComponent>();
  observable$: Observable<ModalDispatchComponent> = this.subject$.asObservable();

  show(customComponent: any, config?: ModalConfig): Observable<any> {
    let result$ = new Subject<any>();
    this.dispatch({
      component: customComponent,
      config: config,
      subject: result$
    });
    return result$.asObservable();
  }

  private dispatch(data: ModalDispatchComponent) {
    this.subject$.next(data);
  }

}
