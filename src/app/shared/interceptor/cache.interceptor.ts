import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cachedResponse = this.cache.get(request.url);

        if (cachedResponse) {
            return of(cachedResponse);
        }

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse && request.url.match(/\/v2\//gi)) {
                        this.cache.set(request.url, event);
                    }
                })
            );
    }
}
