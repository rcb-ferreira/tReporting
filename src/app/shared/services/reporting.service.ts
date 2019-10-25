import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

@Injectable({
    providedIn: 'root'
})
export class ReportingService {
    reports: any = [];
    constructor(private http: HttpClient) {}

    getReport(type, report = null) {
      params += '&agent=all';
      params += '&group=all';
      params += '&disposition=all';
      params += '&calltype=all';
      params += '&page-view=2';
      params += '&refresh-time=0';
      params += '&report-type=hosted';
      params += '&output-type=duration';

      httpOptions.params = new HttpParams({
        fromString: params
      });

      let url = `${api}/reports/${type}`;
          url += report !== null ? `/${report}` : `${''}`;

      return this.http.get(url, httpOptions);
    }

    getFilter(type) {
      const url = `${api}/v2/${type}`;
      return this.http.get(url, httpOptions);
    }
}
