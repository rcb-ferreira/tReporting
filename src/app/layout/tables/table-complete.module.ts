import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdSortableHeaderDirective } from './sortable.directive';
import { NgbdTableCompleteComponent } from './table-complete';
import {
    LinkHandlerDirective,
    ColourHandlerDirective
} from 'src/app/shared/directives/';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';

@NgModule({
    imports: [
        // BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        SharedPipesModule
    ],
    declarations: [
        NgbdTableCompleteComponent,
        NgbdSortableHeaderDirective,
        LinkHandlerDirective,
        ColourHandlerDirective
    ],
    exports: [NgbdTableCompleteComponent],
    bootstrap: [NgbdTableCompleteComponent]
})
export class NgbdTableCompleteModule {}
