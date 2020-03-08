import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler, HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService, ReportingService } from '../services';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(
        public auth: AuthService,
        public report: ReportingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.auth.getTokenSilently$().pipe(
            mergeMap(token => {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (this.report.user) {
                    request = request.clone({
                        setHeaders: {
                            'X-Teleforge-Client': `${this.report.user}`
                        }
                    });
                }

                return next.handle(request);
            }),
            catchError(err => throwError(err))
        );
    }
}
