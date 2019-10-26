import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatmapRoutingModule } from './heatmap-route.module';
import { HeatmapComponent } from './heatmap.component';
import { FiltersModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdTableCompleteModule } from '../tables/table-complete.module';

@NgModule({
    imports: [CommonModule, HeatmapRoutingModule, FiltersModule, NgbModule, NgbdTableCompleteModule],
    declarations: [HeatmapComponent]
})
export class HeatmapModule {}
