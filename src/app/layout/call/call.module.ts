import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallRoutingModule } from './call-routing.module';
import { CallComponent } from './call.component';
import { FiltersModule } from './../../shared';
import { NgbdTableCompleteModule } from '../tables/table-complete.module';

@NgModule({
    imports: [CommonModule, CallRoutingModule, FiltersModule, NgbdTableCompleteModule],
    declarations: [CallComponent]
})
export class CallModule {}
