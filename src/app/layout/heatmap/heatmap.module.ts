import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatmapRoutingModule } from './heatmap-route.module';
import { HeatmapComponent } from './heatmap.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableSortableModule } from '../tables/table-sortable.module';
import { NgbdTableCompleteModule } from '../tables/table-complete.module';

@NgModule({
    imports: [CommonModule, HeatmapRoutingModule, PageHeaderModule, NgbModule, NgbdTableSortableModule, NgbdTableCompleteModule],
    declarations: [HeatmapComponent]
})
export class HeatmapModule {}
