import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, Input} from '@angular/core';
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
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  @Input() tableheaders: any;
  @Input() tablerows: any;
  @Input() rows = 0;

  tableitems$: Observable<TableItem[]>;
  total$: Observable<number>;

  constructor(public service: TableItemService) {
    this.tableitems$ = service.tableitems$;
    // this.total$ = this.tablerows.length$;
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
