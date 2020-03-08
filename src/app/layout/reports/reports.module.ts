import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-route.module';
import { ReportsComponent } from './reports.component';
import { FiltersModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteModule } from '../tables/table-complete.module';

@NgModule({
    imports: [CommonModule, ReportsRoutingModule, FiltersModule, NgbModule, NgbdTableCompleteModule],
    declarations: [ReportsComponent]
})
export class ReportsModule {}
