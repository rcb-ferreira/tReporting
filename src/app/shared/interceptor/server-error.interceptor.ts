import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(public loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.url.match(/\/v2\//gi)) {
            this.loaderService.show();
        }

        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
            finalize(() => {
                if (!request.url.match(/\/v2\//gi)) {
                    this.loaderService.hide();
                }
            })
        );
    }
}
