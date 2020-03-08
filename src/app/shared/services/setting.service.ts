import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor() {}

    loadSettings(): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('In initApp');
                resolve();
            });
        });
    }
}
