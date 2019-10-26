import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService, ErrorService, LoggingService } from './shared';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        // tslint:disable-next-line:prefer-const
        let stackTrace;
        if (error instanceof HttpErrorResponse) {
            // Server error
            message = errorService.getServerMessage(error);
            // stackTrace = errorService.getServerErrorStackTrace(error);
            notifier.showError(message);
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            notifier.showError(message);
        }
        // Always log errors
        logger.logError(message, stackTrace);
        console.error(error);
    }
}
