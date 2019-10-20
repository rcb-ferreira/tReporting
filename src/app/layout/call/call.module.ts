import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallRoutingModule } from './call-routing.module';
import { CallComponent } from './call.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteModule } from '../tables/table-complete.module';

@NgModule({
    imports: [CommonModule, CallRoutingModule, PageHeaderModule, NgbModule, NgbdTableCompleteModule],
    declarations: [CallComponent]
})
export class CallModule {}
