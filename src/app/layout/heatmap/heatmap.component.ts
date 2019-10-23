import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivationEnd, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { ReportingService } from 'src/app/shared/services/reporting.service';

@Component({
    selector: 'app-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.scss'],
    animations: [routerTransition()]
})
export class HeatmapComponent {
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
        this.title = 'Heatmap';

        let activated = false;
        router.events.subscribe(event => {
            if (event instanceof ActivationEnd && !activated) {
                this.title = event.snapshot.data.title;
                this.type = event.snapshot.data.type;
                activated = true;
            }

            if (event instanceof NavigationEnd) {
                activated = false;
                if (router.url.match(/\/heatmap\/(group|agent)/gi)) {
                    this.fetchHeatmap(this.type);
                }
            }
        });
    }

    fetchHeatmap(type) {
        this.loading = true;
        this.reporting.getHeatmap(type)
            .subscribe(
                data => {
                    this.loading = false;

                    this.tableHeaders = data['headers'].headers;
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
