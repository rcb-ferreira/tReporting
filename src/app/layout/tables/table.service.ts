import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {TableItem} from './tableItem';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';

interface SearchResult {
  tableitems: TableItem[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  sortItems: Array<any>;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(tableitems: TableItem[], column: string, direction: string): TableItem[] {
  if (direction === '') {
    return tableitems;
  } else {
    return [...tableitems].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(tableitem: TableItem, term: string, pipe: PipeTransform) {
  return tableitem.call_type.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(tableitem.call_type).includes(term)
    || pipe.transform(tableitem.end_reason).includes(term);
}

@Injectable({providedIn: 'root'})
export class TableItemService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tableitems$ = new BehaviorSubject<TableItem[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 25,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    sortItems: []
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._tableitems$.next(result.tableitems);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get tableitems$() { return this._tableitems$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get sortItems() { return this._state.sortItems; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  set sortItems(sortItems) { this._set({sortItems}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm, sortItems} = this._state;

    // 1. sort
    let tableitems = sort(sortItems, sortColumn, sortDirection);

    // 2. filter
    tableitems = tableitems.filter(country => matches(country, searchTerm, this.pipe));
    const total = tableitems.length;

    // 3. paginate
    tableitems = tableitems.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({tableitems, total});
  }
}
