import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallRoutingModule } from './call-routing.module';
import { CallComponent } from './call.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, CallRoutingModule, PageHeaderModule],
    declarations: [CallComponent]
})
export class CallModule {}
