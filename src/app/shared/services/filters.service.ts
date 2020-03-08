import { Injectable } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

interface Report {
    fromdate: string;
    todate: string;
    'output-type': string;
    offset: number;
    length: number;
    order: string;
}
interface Search {
    params: object;
    report: string;
    type: string;
}

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    private _report: Report = {
        fromdate: `${this.getDate.year - 2}-${this.getDate.month}-${this.getDate.day}`,
        todate: `${this.getDate.year}-${this.getDate.month}-${this.getDate.day}`,
        'output-type': 'duration',
        offset: 0,
        length: 100,
        order: ''
    };

    private _search: Search = {
        params: this._report,
        type: '',
        report: ''
    };

    public _triggerSearch$ = new BehaviorSubject<Search>({
        params: {},
        report: '',
        type: ''
    });

    constructor(
        private calendar: NgbCalendar,
    ) {}

    get getDate() { return this.calendar.getToday(); }

    get params() { return this._search.params; }
    get reset() { return this._report; }
    get report() { return this._search.report; }
    get type() { return this._search.type; }

    set params(params) { this._set({ params }); }
    set report(report) { this._set({ report }); }
    set type(type) { this._set({ type }); }

    private _set(patch: Partial<Search>) {
        Object.assign(this._search, patch);
    }

    set setReport(search: Search) {
        this._triggerSearch$.next(search);
    }
}
