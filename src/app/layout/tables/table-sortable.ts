import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ReportingService } from 'src/app/shared/services/reporting.service';

interface Country {
    id: number;
    name: string;
    flag: string;
    area: number;
    population: number;
}

let ITEMS: any;

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
    column: string;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class NgbdSortableHeader {

    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}

@Component({
    selector: 'ngbd-table-sortable',
    templateUrl: './table-sortable.html',
    styleUrls: ['./table-sortable.scss']
})
export class NgbdTableSortable {

    items: any;
    tableHeaders: any;

    page = 1;
    pageSize = 4;
    collectionSize = 0;

    constructor(readonly reports: ReportingService ) {
        this.reports.getFilter('trail')
            .subscribe(
                data => {
                    this.tableHeaders = data['headers'].headers.filter(val => {
                        if (val.visible !== false) {
                            return val;
                        }
                    });
                    ITEMS = data['data'];
                    this.collectionSize = ITEMS.length;
                    this.items = ITEMS;
                },
                error => console.log('error', error)
            );
    }

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    onSort({ column, direction }: SortEvent) {

        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        // sorting items
        if (direction === '') {
            this.items = ITEMS;
        } else {
            this.items = [...ITEMS].sort((a, b) => {
                const res = compare(a[column], b[column]);
                return direction === 'asc' ? res : -res;
            });
        }
    }



}
