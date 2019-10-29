import { Injectable, NgZone } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private zone: NgZone) { }

    showSuccess(message: string): void {
        // Had an issue with the snackbar being ran outside of angular's zone.
        this.zone.run(() => {
            // temp alert message
            alert(message);
        });
    }

    showError(message: string): void {
        this.zone.run(() => {
            // temp alert message
            alert(message);
        });
    }
}
