import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { ReportingService } from 'src/app/shared/services/reporting.service';

@Component({
    selector: 'app-distribution',
    templateUrl: './distribution.component.html',
    styleUrls: ['./distribution.component.scss'],
    animations: [routerTransition()]
})
export class DistributionComponent implements OnInit {
    tableHeaders: any;
    tableBody: any;
    filters: any[] = [];
    title: string;
    tableRows: any;
    totals: any;

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService
    ) {
        this.filters = [];

        let activated = false;
        router.events.subscribe(event => {

            if (event instanceof ActivationEnd && !activated) {
                this.title = event.snapshot.data.title;
                this.fetchDistribution(event.snapshot.data.type);
                activated = true;
            }

            if (event instanceof NavigationEnd && activated) {
                activated = false;
            }
        });
    }

    ngOnInit() {
        this.title = 'Hallo world';
    }

    fetchDistribution(type) {

        this.reporting.getDistribution(type)
            .subscribe(
                data => {
                    this.tableHeaders = data['headers'].headers;
                    this.tableRows = data['data'];
                    this.totals = data['rows'];
                },
                error => console.log('error', error)
            );
    }
}
