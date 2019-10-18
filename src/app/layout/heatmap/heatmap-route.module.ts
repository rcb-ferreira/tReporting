import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatmapComponent } from './heatmap.component';

const routes: Routes = [
    {
        path: '',
        component: HeatmapComponent,
        children: [
            {
                path: 'agent',
                component: HeatmapComponent,
                data: { title: 'agent' }
            },
            {
                path: 'group',
                component: HeatmapComponent,
                data: { title: 'group' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeatmapRoutingModule {
}
