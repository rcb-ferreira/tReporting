import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { ReportingService } from 'src/app/shared/services';

export interface SearchEvent {
    type: string;
    report: string;
    params: string;
}

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
    filters: any[] = [];
    @Output() search = new EventEmitter<SearchEvent>();

    constructor(
        readonly router: Router,
        readonly reporting: ReportingService,
    ) {}

    ngOnInit() {
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

        this.search.emit({
            type: s[1]['path'],
            report: s[0]['path'],
            params: tree.queryParams.toString()
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
}
