import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const api = environment.api.heroku;

const httpOptions = {
  params: new HttpParams(),
};

interface State {
  user: string;
}

@Injectable({
    providedIn: 'root'
})
export class ReportingService {
  private _state: State = {
    user: '',
  };

  constructor(
    private http: HttpClient,
    public auth: AuthService
  ) {}

  get user() { return this._state.user; }
  set user(user) { this._set({ user }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
  }

  getReport(type, report = null, qParams) {
    httpOptions.params = new HttpParams({
      fromObject: qParams
    });

    let url = `${api}/reports/${type}`;
    url += report !== null ? `/${report}` : `${''}`;

    return this.http.get(url, httpOptions);
  }

  getFilter(type) {
    const url = `${api}/v2/${type}`;
    return this.http.get(url);
  }
}
