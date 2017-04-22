import { ComponentFactoryResolver } from '@angular/core';
import { ModalOptions, ModalDirective } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';

export interface ModalConfig {
  modalOptions?: ModalOptions;
  modalData?: any;
  cfr?: ComponentFactoryResolver;
}

export interface ModalDispatchComponent {
  component: any;
  subject: Subject<any>;
  config?: ModalConfig;
}

export interface ModalTemplate {
  modalSubject$: Subject<any>;
  boot(modal: ModalDirective, modalData: any): void;
}
