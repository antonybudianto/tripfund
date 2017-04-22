import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';

import { ModalDispatchComponent } from './modal.interface';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('modalContent', { read: ViewContainerRef })
  modalContent: ViewContainerRef;
  modalData: any;
  rootCfr: ComponentFactoryResolver;
  private modalSubscription: Subscription;

  constructor(private modalService: ModalService,
              private vcr: ViewContainerRef,
              private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
    this.modalSubscription = this.modalService.observable$.subscribe(
      (dispatchedData: ModalDispatchComponent) => {
        this.prepareConfig(dispatchedData.config);
        this.createComponentTemplate(dispatchedData.component, dispatchedData.subject);
      }
    );
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  private prepareConfig(config) {
    this.modal.config = _.get(config, 'modalOptions', {});
    this.modalData = _.get(config, 'modalData', {});
    this.rootCfr = _.get(config, 'cfr', this.cfr);
  }

  private createComponentTemplate(component: any, subject: Subject<any>) {
    this.modalContent.clear();
    const componentResolver: ComponentFactory<any> = this.rootCfr.resolveComponentFactory(component);
    const modalTemplate: ComponentRef<any> = this.modalContent.createComponent(componentResolver);
    modalTemplate.instance.modalSubject$ = subject;
    modalTemplate.instance.boot(this.modal, this.modalData);
    modalTemplate.changeDetectorRef.detectChanges();
  }

}
