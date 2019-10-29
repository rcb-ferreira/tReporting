import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { NgbCalendar, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { ReportingService } from 'src/app/shared/services';

interface Report {
    fromdate: string;
    todate: string;
    'output-type': string;
}

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
    filters: any[] = [];
    filterSelected: any[] = [];
    filterTypes = ['agents', 'groups', 'dispositions', 'calltypes'];

    type: string;
    report: string;
    params: any;

    toModel = {};
    fromModel = {};
    agentModel: any;

    @Output() search = new EventEmitter<SearchEvent>();

    private _report: Report = {
        fromdate: `${this.getDate.year - 2}-${this.getDate.month}-${this.getDate.day}`,
        todate: `${this.getDate.year}-${this.getDate.month}-${this.getDate.day}`,
        'output-type': 'duration'
    };

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService,
        private calendar: NgbCalendar,
    ) {}

    get getDate() { return this.calendar.getToday(); }

    get reportParams() { return this._report; }
    set reportParams(report: any) { this._report = report; }

    @ViewChild('agent', { static: true }) agent: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    searchagent = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.agent.isPopupOpen()));
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

        this.filterTypes.map(val => this.filter(val));
    }

    fetchRoute(url) {
        const tree: UrlTree = this.router.parseUrl(url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;

        this.type = s[1]['path'];
        this.report = s[0]['path'];

        if (tree.queryParams && tree.queryParams['fromdate']) {
            this.reportParams = tree.queryParams;
        }

        if (s[1]['path'].match(/interaction/gi)) {
            this.type = 'interaction/overview';
            this.report = null;
        } else if (s[1]['path'].match(/hourly/gi)) {
            this.type = 'hours';
            this.report = null;
        } else if (s[0]['path'].match(/call/gi)) {
            this.report = null;
        }

        this.setFormData();
    }

    setFilter(type, data) {
        if (!data) { return; }

        if (data.groupId) {
            this.reportParams[`${type}`] = data.groupId;
            this.filterSelected[`${type}-selected`] = data.groupName;
        } else {
            this.reportParams[`${type}`] = data;
        }

        this.setFormData();
    }

    setDate(type, data) {
        if (!data) { return; }

        this.reportParams[type] = `${data.year}-${data.month}-${data.day}`;
        this.setFormData();
    }

    filter(type) {

        const params = this.reportParams;
        this.reporting.getFilter(type)
            .subscribe(
                data => {
                    this.filters[`${type}`] = data;

                    // Set group value in view
                    if (type === 'groups') {
                        const item = this.filters[`${type}`].filter(val => val.groupId === +params['group']);
                        this.filterSelected[`group-selected`] = item[0].groupName;
                    }
                },
                error => console.log('error', error)
            );
    }

    setFormData() {
        const type = this.type;
        const report = this.report;
        const params = this.reportParams;

        // set selected date in view
        const from = params.fromdate.split('-');
        const to = params.todate.split('-');
        this.fromModel = { year: +from[0], month: +from[1], day: +from[2]};
        this.toModel = { year: +to[0], month: +to[1], day: +to[2]};

        // set selected agent
        this.agentModel = params['agent'] !== 'all' ? params['agent'] : '';

        this.filterTypes.map(key => {
            const k = key.slice(0, -1);
            this.filterSelected[`${k}`] = params[`${k}`] !== 'all' ? params[`${k}`] : '';
        });

        this.search.emit({
            type,
            report,
            params
        });
    }
}
