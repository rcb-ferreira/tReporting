import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'X-Teleforge-Datatables': 'true'
  }),
  params: new HttpParams(),
  withCredentials: true
};

const api = `http://localhost:8081/api`;

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

httpOptions.params = new HttpParams({
  fromString: params
});

@Injectable({
    providedIn: 'root'
})
export class ReportingService {
    reports: any = [];
    constructor(private http: HttpClient) {}

    getCall(type) {
        // let params = '';
        //     params += 'fromdate=2014-01-10';
        //     params += '&todate=2019-12-30';
        //     params += '&agent=all';
        //     params += '&group=all';
        //     params += '&disposition=all';
        //     params += '&calltype=all';
        //     params += '&page-view=2';
        //     params += '&refresh-time=0';
        //     params += '&report-type=hosted';
        //     params += '&output-type=duration';

        // httpOptions.params = new HttpParams({
        //     fromString: params
        // });

        // const url = `${api}/reports/trail`;

        const url = `/assets/temp/${type}.json`;
        return this.http.get(url);
    }

    getHeatmap(type) {
      const url = `${api}/reports/${type}/heatmap`;
      return this.http.get(url, httpOptions);
    }

    getDistribution(type) {
      const url = `${api}/reports/${type}/distribution`;
      return this.http.get(url, httpOptions);
    }

    getReport(type) {
      const url = `${api}/reports/${type}`;
      return this.http.get(url, httpOptions);
    }

    getFilter(type) {
        const url = `/assets/temp/${type}.json`;
        return this.http.get(url, httpOptions);
    }
    // getAgents() {
    //     // const url = `${api}/v2/agents`;
    //     const url = `/assets/temp/agents.json`;
    //     return this.http.get(url, httpOptions);
    // }

    // getCalltypes() {
    //     // const url = `${api}/v2/calltypes`;
    //     const url = `/assets/temp/calltypes.json`;
    //     return this.http.get(url, httpOptions);
    // }

    // getDisposition() {
    //     // const url = `${api}//v2/disposition`;
    //     const url = `/assets/temp/disposition.json`;
    //     return this.http.get(url, httpOptions);
    // }

    // getGroups() {
    //     // const url = `${api}//v2/groups`;
    //     const url = `/assets/temp/groups.json`;
    //     return this.http.get(url, httpOptions);
    // }
}
