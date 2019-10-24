import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { GlobalErrorHandler } from './global-error-handler';
import { ServerErrorInterceptor } from './shared/interceptor/server-error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
