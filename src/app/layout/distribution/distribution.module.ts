import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionRoutingModule } from './distribution-route.module';
import { DistributionComponent } from './distribution.component';
import { FiltersModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteModule } from '../tables/table-complete.module';

@NgModule({
    imports: [CommonModule, DistributionRoutingModule, FiltersModule, NgbModule, NgbdTableCompleteModule],
    declarations: [DistributionComponent]
})
export class DistributionModule {}
