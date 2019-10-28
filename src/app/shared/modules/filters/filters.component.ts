import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Router, NavigationEnd, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { ReportingService } from 'src/app/shared/services';

export interface SearchEvent {
    type: string;
    report: string;
    params: any;
}

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
    fromModel = {};
    toModel = {};
    filters: any[] = [];
    filterSelected: any[] = [];
    date: { year: number, day: number, month: number };
    @Output() search = new EventEmitter<SearchEvent>();

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService,
        private calendar: NgbCalendar,
    ) {}

    get getDate() {
        return this.calendar.getToday();
    }

    @ViewChild('fromdate', { static: true }) fromdate: ElementRef;
    @ViewChild('todate', { static: true }) todate: ElementRef;

    ngOnInit() {
        this.filterSelected = [];

        // On initial load fetch route
        this.fetchRoute(this.router.url);

        this.router.events.subscribe(event => {
            // On each navigation end event fetch route
            if (event instanceof NavigationEnd) {
                this.fetchRoute(this.router.url);
            }
        });
    }

    fetchRoute(url) {
        const tree: UrlTree = this.router.parseUrl(url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;

        if (s[0]['path'].match(/call/gi)) {
            s[0]['path'] = null;
        } else if (s[1]['path'].match(/hourly/gi)) {
            s[0]['path'] = null;
            s[1]['path'] = 'hours';
        }

        this.setFormData(s[1]['path'], s[0]['path'], tree.queryParams);
    }

    setFilter(type, data) {
        if (!data) { return; }
        this.filterSelected[`${type}`] = data ;
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

    setFormData(type, report, params) {
        const { fromdate, todate, agent, group, disposition, calltype } = params;

        this.setFilter('agents', agent);
        this.setFilter('groups', group);
        this.setFilter('dispositions', disposition);
        this.setFilter('calltypes', calltype);

        if (!fromdate || !todate ) {
            this.toModel = this.getDate;
            this.fromModel = {
                year: this.getDate.year - 2,
                month: this.getDate.month,
                day: this.getDate.day,
            };

            params = {
                fromdate: `${this.fromModel['year']}-${this.fromModel['day']}-${this.fromModel['month']}`,
                todate: `${this.getDate.year}-${this.getDate.day}-${this.getDate.month}`,
                'output-type': 'duration'
            };
        } else {
            const fromArray = fromdate.split('-');
            const toArray = todate.split('-');

            this.fromModel = {
                year: +fromArray[0],
                month: +fromArray[1],
                day: +fromArray[2],
            };

            this.toModel = {
                year: +toArray[0],
                month: +toArray[1],
                day: +toArray[2],
            };
        }

        this.search.emit({
            type,
            report,
            params
        });
    }
}
