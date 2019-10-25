import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { ReportingService } from 'src/app/shared/services/reporting.service';
import { LoaderService } from '../../shared/services/loader.service';

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
    loading: boolean;

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService,
        public loaderService: LoaderService
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
                    this.fetchReport(this.type);
                }
            }
        });
    }

    fetchReport(type, report = null) {

        this.tableHeaders = [];
        this.tableRows = [];
        this.totals = 0;

        this.reporting.getReport(type, report)
            .subscribe(
                data => {
                    this.tableHeaders = data[0]['headers'];
                    this.tableRows = data['data'];
                    this.totals = data['rows'];
                }
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
