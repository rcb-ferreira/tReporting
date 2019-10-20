import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdSortableHeaderDirective } from './sortable.directive';
import { NgbdTableCompleteComponent } from './table-complete';

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [NgbdTableCompleteComponent, NgbdSortableHeaderDirective],
  exports: [NgbdTableCompleteComponent],
  bootstrap: [NgbdTableCompleteComponent]
})
export class NgbdTableCompleteModule {}
