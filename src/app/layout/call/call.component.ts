import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ReportingService } from 'src/app/shared/services/reporting.service';

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss'],
    animations: [routerTransition()]
})
export class CallComponent {
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
                    this.tableHeaders = data['headers'];
                    this.tableRows = data['data'];
                    this.totals = data['rows'];
                }
            );
    }
}
