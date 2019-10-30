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
    hideTable: boolean;
    tableHeaders: any;
    tableRows: any;
    totals: number;

    constructor(
        readonly reporting: ReportingService,
    ) {
        this.hideTable = true;
    }

    fetchReport(event) {
        this.hideTable = false;
        this.tableHeaders = [];
        this.tableRows = [];
        this.totals = 0;

        this.reporting.getReport(event.type, event.report, event.params)
            .subscribe(
                data => {
                    this.tableHeaders = data['headers'].filter(val => {
                        if (val.visible !== false) {
                            return val;
                        }
                    });
                    this.tableRows = data['data'];
                    this.totals = data['rows'];
                }
            );
    }

}
