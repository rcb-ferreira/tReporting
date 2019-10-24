import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { ReportingService } from 'src/app/shared/services/reporting.service';

@Component({
    selector: 'app-distribution',
    templateUrl: './distribution.component.html',
    styleUrls: ['./distribution.component.scss'],
    animations: [routerTransition()]
})
export class DistributionComponent {
    tableHeaders: any;
    tableBody: any;
    filters: any[] = [];
    title: string;
    tableRows: any;
    totals: any;
    type: any;
    loading: boolean;

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
                if (router.url.match(/\/distribution\/(group|agent)/gi)) {
                    this.fetchDistribution(this.type);
                } else if (router.url.match(/\/distribution\/(hourly)/gi)) {
                    this.fetchHours(this.type);
                }
            }
        });
    }

    fetchDistribution(type) {
        this.loading = true;
        this.reporting.getDistribution(type)
            .subscribe(
                data => {
                    this.loading = false;

                    this.tableHeaders = data[0]['headers'];
                    this.tableRows = data['data'];
                    this.totals = data['rows'];
                },
                error => {
                    this.loading = false;
                    console.log('error', error);
                }
            );
    }

    fetchHours(type) {
        this.loading = true;
        this.reporting.getReport(type)
            .subscribe(
                data => {
                    this.loading = false;

                    this.tableHeaders = data[0]['headers'];
                    this.tableRows = data['data'];
                    this.totals = data['rows'];
                },
                error => {
                    this.loading = false;
                    console.log('error', error);
                }
            );
    }
}
