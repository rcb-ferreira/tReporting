import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'call', pathMatch: 'prefix' },
            { path: 'call', loadChildren: () => import('./call/call.module').then(m => m.CallModule) },
            { path: 'distribution', loadChildren: () => import('./distribution/distribution.module').then(m => m.DistributionModule) },
            { path: 'heatmap', loadChildren: () => import('./heatmap/heatmap.module').then(m => m.HeatmapModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
