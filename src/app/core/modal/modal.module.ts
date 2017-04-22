import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { ModalModule as ModalBootstrapModule } from 'ng2-bootstrap';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
  imports: [
    ModalBootstrapModule.forRoot(),
  ],
  declarations: [
    ModalComponent,
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: [
      ModalComponent
    ], multi: true }
  ]
})
export class ModalModule {
}
