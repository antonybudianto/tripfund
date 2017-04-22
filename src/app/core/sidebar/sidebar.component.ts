import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [
        './sidebar.component.css'
    ],
})
export class SidebarComponent {
    constructor(private router: Router,
                private authService: AuthService) {}

    logout() {
        this.authService.logout()
            .then(
                res => {
                    this.router.navigate(['/']);
                }
            );
    }
}
