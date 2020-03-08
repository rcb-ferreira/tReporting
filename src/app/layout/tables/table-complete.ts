import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, Input, OnInit, HostListener} from '@angular/core';
import {Observable} from 'rxjs';

import {TableItem} from './tableItem';
import {TableItemService} from './table.service';
import {NgbdSortableHeaderDirective, SortEvent} from './sortable.directive';
import { FilterService } from 'src/app/shared';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-table-complete',
  templateUrl: './table-complete.html',
  styleUrls: ['./table-sortable.scss'],
  providers: [TableItemService, DecimalPipe]
})
export class NgbdTableCompleteComponent implements OnInit {
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  @Input() tableheaders: Array<any> = [];
  @Input()
    public set tablerows(items: any) {
      this.service.sortItems = items;
      this.sort = [];
      this.sort[this.service.sortColumn] = this.service.sortDirection;
    }

  @Input() rows: any = 0;

  show: boolean;
  sort: any;
  tableheadersTemp: any;

  tableitems$: Observable<TableItem[]>;
  total$: Observable<number>;

  public innerHeight: any;
  constructor(public service: TableItemService, readonly filter: FilterService) {
    this.tableitems$ = this.service.tableitems$;
    this.total$ = this.service.total$;
  }

    ngOnInit() {
        this.sort = [];
        // Clear array on each subscribe
        this.tableitems$.subscribe(() => {
            this.tableheadersTemp = [];
        });

        this.innerHeight = window.innerHeight;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerHeight = window.innerHeight;
    }

    onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.service.sortColumn = column;
        this.service.sortDirection = direction;

        let order = '';
        this.sort = [];
        if (direction) {
            this.sort[column] = direction;
            order = `column=${column},direction=${direction.toUpperCase()}`;
        }

        this.filter.params['order'] = order;
        this.filter.setReport = {
            type: this.filter.type,
            report: this.filter.report,
            params: this.filter.params
        };
    }

    hideHeader(i, header) {
        header.id = i;
        this.tableheadersTemp.splice(i, 0, header);
        this.tableheaders.splice(i, 1);
    }

    showHeader(i, header) {
        const id = header.id;
        this.tableheaders.splice(id, 0, header);
        this.tableheadersTemp.splice(i, 1);
    }

    toggleShow() {
        this.show = !this.show;
    }

    pageClick(value) {
        this.filter.params['offset'] = (value - 1) * 100;

        this.filter.setReport = {
            type: this.filter.type,
            report: this.filter.report,
            params: this.filter.params
        };
    }
}
