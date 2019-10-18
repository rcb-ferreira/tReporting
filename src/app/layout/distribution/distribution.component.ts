import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
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

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService
    ) {
        this.filters = [];
    }

    ngOnInit() {
        this.title = 'Hallo world';
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
