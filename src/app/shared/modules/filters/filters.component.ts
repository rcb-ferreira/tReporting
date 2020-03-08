import { Component, Output, EventEmitter, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { Subject, Observable, merge } from 'rxjs';
import { filter, takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ReportingService, FilterService, ExportService } from 'src/app/shared/services';

export interface SearchEvent {
    type: string;
    report: string;
    params: any;
}
export interface ExportEvent {
    type: string;
}

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
    public destroyed = new Subject<any>();
    clearNumber: boolean;
    model = {
        from: {},
        to: {},
        agent: '',
    };

    filters: any[] = [];
    filterSelected: any[] = [];
    filterTypes = ['agents', 'groups', 'dispositions', 'calltypes'];

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService,
        public fitler: FilterService
    ) {}

    @ViewChild('number', { static: true }) number: ElementRef;
    @ViewChild('agent', { static: true }) agent: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    ngOnInit() {

        // On initial load fetch route
        this.fetchRoute(this.router.url);
        this.filterTypes.map(f => this.loadFilters(f));

        // On each navigation end event fetch route
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this.destroyed)
            )
            .subscribe(() => {
                this.fetchRoute(this.router.url);
            });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    searchagent = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.agent.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === '' ? this.filters['agents'] : this.filters['agents'].filter(v => v.toString().indexOf(term) > -1)).slice(0, 10)
            )
        );
    }

    setFilter(type, data) {
        if (!data) {
            return;
        }

        if (data.groupId) {
            this.fitler.params[`${type}`] = data.groupId;
            this.filterSelected[`${type}-selected`] = data.groupName;
        } else {
            this.fitler.params[`${type}`] = data;
        }

        this.setFormData();
    }

    setDate(type, data) {
        if (!data) {
            return;
        }

        this.fitler.params[type] = `${data.year}-${data.month}-${data.day}`;
        this.setFormData();
    }

    searchnumber(number) {
        this.fitler.params = { ...this.fitler.params, numbersearch: number };
        this.setFormData();
    }

    loadFilters(type) {
        const params = this.fitler.params;
        this.reporting.getFilter(type)
            .subscribe(
                data => {
                    this.filters[`${type}`] = data;

                    // Set group value in view
                    if (type === 'groups') {
                        const item = this.filters[`${type}`].filter(val => val.groupId === +params['group']);

                        if (item[0] && item[0].groupName) {
                            this.filterSelected[`group-selected`] = item[0].groupName;
                        }
                    }
                }
            );
    }

    clearFilter(type) {
        this.fitler.params[type] = '';
        this.setFormData();
    }

    fetchRoute(url) {
        const tree: UrlTree = this.router.parseUrl(url);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;

        let type = s[1]['path'];
        let report = s[0]['path'];

        // set default params;
        this.fitler.params['offset'] = 0;

        let params = { ...this.fitler.params, ...tree.queryParams };
        if (JSON.stringify(tree.queryParams) === '{}') {
            params = { ...this.fitler.reset };
        }

        if (s[2] && s[2]['path'].match(/hour/gi)) {
            type = `interaction/hour/${s[3]['path']}`;
            report = null;
        } else if (s[2] && s[2]['path'].match(/day/gi)) {
            type = 'interaction/day';
            report = null;
        } else if (s[1]['path'].match(/interaction/gi)) {
            type = 'interaction/overview';
            report = null;
        } else if (s[1]['path'].match(/hourly/gi)) {
            type = 'hours';
            report = null;
        } else if (s[0]['path'].match(/call/gi)) {
            report = null;
        }

        // Remove AuthO params
        delete params.code;
        delete params.state;

        this.fitler.params = params;
        this.fitler.report = report;
        this.fitler.type = type;

        this.setFormData();
    }

    setFormData() {
        const type = this.fitler.type;
        const report = this.fitler.report;
        const params = this.fitler.params;

        console.log('params', params);
        // Set defaults
        const from = params['fromdate'].split('-');
        const to = params['todate'].split('-');
        this.model = {
            from: { year: +from[0], month: +from[1], day: +from[2] },
            to: { year: +to[0], month: +to[1], day: +to[2] },
            agent: params['agent'] !== 'all' ? params['agent'] : ''
        };

        // set number
        this.number.nativeElement.value = params['numbersearch'] || '';
        this.clearNumber = this.number.nativeElement.value ? true : false;

        // Set filter type
        this.filterTypes.map(key => {
            const k = key.slice(0, -1);
            this.filterSelected[`${k}`] = params[`${k}`] !== 'all' ? params[`${k}`] : '';
        });

        this.fitler.setReport = { type, report, params };
    }
}
