import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NgbCalendar, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';


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
    toModel = {};
    fromModel = {};
    filters: any[] = [];
    filterSelected: any[] = [];

    type: string;
    report: string;
    params: any;

    @Output() search = new EventEmitter<SearchEvent>();

    model: any;

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService,
        private calendar: NgbCalendar,
    ) {}

    get getDate() {
        return this.calendar.getToday();
    }

    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    searchterm = (text$: Observable<string>) => {

        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.filters['agents']
                : this.filters['agents'].filter(v => v.toString().indexOf(term) > -1)).slice(0, 10)
            )
        );
    }

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

        ['agents', 'groups', 'dispositions', 'calltypes'].map(
            val => {
                this.filter(val);
            }
        );
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

        this.type = s[1]['path'];
        this.report = s[0]['path'];
        this.params = tree.queryParams;

        this.setFormData(this.type, this.report, this.params);
    }

    setFilter(type, data) {
        if (!data) { return; }
        this.filterSelected[`${type}`] = data ;

        this.params[`${type}`] = data;
        this.search.emit({
            type: this.type,
            report: this.report,
            params: this.params
        });
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

            this.params = {
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
            params: this.params
        });
    }
}
