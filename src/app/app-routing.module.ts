import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { RedirectIfAuthGuard } from './core/redirect-if-authenticated.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './guest/error/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        canActivate: [
            RedirectIfAuthGuard
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {

}
