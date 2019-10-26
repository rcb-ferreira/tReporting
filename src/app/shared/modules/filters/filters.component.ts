import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/shared/services/reporting.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
    filters: any[] = [];

    constructor(
        readonly reporting: ReportingService,
    ) {
        this.filters = [];
    }

    ngOnInit() {}

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
