import { Component, OnInit } from '@angular/core';
import { ReportingService, ExportService, FilterService } from 'src/app/shared';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    hideTable: boolean;
    exportName: any;
    tableHeaders: any;
    tableRows: any;
    totals: number;

    constructor(
        readonly reporting: ReportingService,
        public exp: ExportService,
        public filter: FilterService
    ) {}

    ngOnInit() {
        this.hideTable = true;
        this.tableHeaders = [];
        this.tableRows = [];
        this.totals = 0;

        this.filter._triggerSearch$.subscribe(search => {
            if (search.type || search.report) {
                this.fetchReport(search);
            }
        });
    }

    fetchReport(event) {
        this.exportName = `${event.type}-${event.report}`;

        this.reporting.getReport(event.type, event.report, event.params)
            .subscribe(data => {
                this.hideTable = false;
                this.tableHeaders = data['headers'].filter(val => val.visible !== false);
                this.tableRows = data['data'];
                this.totals = data['rows'];
            });
    }

    exportReport(event) {
        if (event.type) {
            const headers = [];
            const rows = this.tableRows;
            this.tableHeaders.forEach(element => {
                headers.push(element.data);
            });

            const data = {
                headers,
                rows
            };

            this.exp.downloadFile(data, this.exportName || 'teleforge');
        }
    }
}
