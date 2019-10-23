import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { ReportingService } from 'src/app/shared/services/reporting.service';

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss'],
    animations: [routerTransition()]
})
export class CallComponent {
    tableHeaders: any;
    tableRows: any;
    filters: any[] = [];
    totals: number;
    title: any;
    type: any;

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService
    ) {
        this.filters = [];
        let activated = false;
        router.events.subscribe(event => {
            if (event instanceof ActivationEnd && !activated) {
                this.title = event.snapshot.data.title;
                this.type = event.snapshot.data.type;
                activated = true;
            }

            if (event instanceof NavigationEnd) {
                activated = false;
                if (router.url.match(/\/call\/(trail|interaction)/gi)) {
                    this.fetchCall(this.type);
                }
            }
        });
    }

    fetchCall(type) {
        this.reporting.getCall(type)
            .subscribe(
                data => {
                    // this.tableHeaders = data['headers'].headers;
                    this.tableHeaders = data['headers'].headers.filter(val => {
                        if (val.visible !== false) {
                            return val;
                        }
                    });

                    this.tableRows = data['data'];
                    this.totals = data['rows'];
                },
                error => console.log('error', error)
            );
    }

    filter(type) {

        this.reporting.getFilter(type)
            .subscribe(
                data => {
                    this.filters[`${type}`] = data;
                },
                error => console.log('error', error)
            );
    }
}
