import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }),
  params: new HttpParams(),
  withCredentials: true
};

// const api = `http://localhost:8081/api`;
const api = `http://htrm.herokuapp.com/api`;

let params = '';
    params += 'fromdate=2014-01-10';
    params += '&todate=2019-12-30';
    params += '&agent=all';
    params += '&group=all';
    params += '&disposition=all';
    params += '&calltype=all';
    params += '&page-view=2';
    params += '&refresh-time=0';
    params += '&report-type=hosted';
    params += '&output-type=duration';

interface State {
  user: string;
}

@Injectable({
    providedIn: 'root'
})
export class ReportingService {
    private _users$ = new BehaviorSubject<any>('');
    private _state: State = {
      user: '',
    };

    constructor(private http: HttpClient) {
      this.getUser();
    }

    get user$() { return this._users$.asObservable(); }
    set user(user: string) { this._set({ user }); }

    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
    }

    getReport(type, report = null) {

      httpOptions.params = new HttpParams({
        fromString: params
      });

      let url = `${api}/reports/${type}`;
          url += report !== null ? `/${report}/` : `${'/'}`;

      return this.http.get(url, httpOptions);
    }

    getFilter(type) {
      const url = `${api}/v2/${type}`;
      return this.http.get(url, httpOptions);
    }

    getUser() {
      const url = `${api}/v2/user`;
      return this.http.get(url, httpOptions)
        .subscribe(
          data => {
            this._users$.next(data);
          }
        );
    }
}
