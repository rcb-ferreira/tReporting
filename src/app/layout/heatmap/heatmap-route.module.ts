import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatmapComponent } from './heatmap.component';

const routes: Routes = [
    {
        path: '',
        component: HeatmapComponent,
        children: [
            { path: '', redirectTo: 'agent', pathMatch: 'prefix' },
            {
                path: 'agent',
                component: HeatmapComponent,
                data: { title: 'Agents heatmap', type: 'agent' }
            },
            {
                path: 'group',
                component: HeatmapComponent,
                data: { title: 'Groups heatmap', type: 'group' }
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
