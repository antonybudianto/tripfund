import { Injectable, ComponentFactoryResolver, ApplicationRef } from '@angular/core';

import { ToastsManager, ToastOptions as ToastCoreOptions } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastrService extends ToastsManager {

    constructor(componentFactoryResolver: ComponentFactoryResolver,
                appRef: ApplicationRef,
                options: ToastCoreOptions) {
        super(
            componentFactoryResolver,
            appRef,
            Object.assign(options, {
                positionClass: 'toast-top-center',
            })
        );
    }
}
