import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ToastsManager, ToastModule as ToastrCoreModule } from 'ng2-toastr/ng2-toastr';

import { ToastrService } from './toastr.service';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ToastrCoreModule.forRoot()
    ],
    providers: [{
      provide: ToastsManager, useClass: ToastrService
    }]
})
export class ToastrModule { }
