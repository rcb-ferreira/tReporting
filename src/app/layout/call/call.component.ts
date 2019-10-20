import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ReportingService } from 'src/app/shared/services/reporting.service';

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss'],
    animations: [routerTransition()]
})
export class CallComponent implements OnInit {
    tableHeaders: any;
    tableRows: any;
    filters: any[] = [];
    totals: number;

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService
    ) {
        this.filters = [];
    }

    ngOnInit() {
        this.reporting.getReports()
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
