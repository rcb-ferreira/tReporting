import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReportingService } from 'src/app/shared/services/reporting.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    user$: Observable<string>;
    filters: any[] = [];
    clients: any;
    constructor(
        public router: Router,
        public reporting: ReportingService,
        public auth: AuthService
    ) {
        auth.userProfile$.subscribe(user => {
            if (user) {
                const accountCode = user['http://htrm-jwt.herokuapp.com/api/app_metadata']['account_code'];
                this.user$ = accountCode;
                this.reporting.user = accountCode;
                this.filter('account/codes');
            }
        });

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.auth.logout();
    }

    filter(type) {
        this.reporting.getFilter(type)
            .subscribe(
                data => {
                    this.clients = data;
                },
                error => console.log('error', error)
            );
    }

    switchClient(client) {
        this.user$ = client.client_name;
        this.reporting.user = client.client_name;
        this.router.navigateByUrl('/');
    }
}
