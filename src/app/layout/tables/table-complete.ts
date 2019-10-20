import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import { HEADERS } from './headers';

import {TableItem} from './tableItem';
import {TableItemService} from './table.service';
import {NgbdSortableHeaderDirective, SortEvent} from './sortable.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-table-complete',
  templateUrl: './table-complete.html',
  styleUrls: ['./table-sortable.scss'],
  providers: [TableItemService, DecimalPipe]
})
export class NgbdTableCompleteComponent {
  tableitems$: Observable<TableItem[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  tableHeaders: any;

  constructor(public service: TableItemService) {
    this.tableitems$ = service.tableitems$;
    this.total$ = service.total$;

    this.tableHeaders = HEADERS.filter(val => {
      if (val['visible'] !== false) {
        return val;
      }
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
