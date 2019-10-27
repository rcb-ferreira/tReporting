import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { group } from '@angular/animations';

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

  getReport(type, report = null, qParams) {
    const { fromdate, todate, agent, disposition, calltype } = qParams;

    let params = '';
        params += 'fromdate=' + (fromdate || '2014-01-10') + '';
        params += '&todate=' + (todate || '2019-10-27') + '';
        params += '&agent=' + (agent || 'all') + '';
        params += '&group=' + (group || 'all') + '';
        params += '&disposition=' + (disposition || 'all') + '';
        params += '&calltype=' + (calltype || 'all') + '';
        params += '&page-view=2';
        params += '&refresh-time=0';
        params += '&report-type=hosted';
        params += '&output-type=duration';

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
