import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'call', pathMatch: 'prefix' },
            { path: 'call', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
            { path: 'distribution', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
            { path: 'heatmap', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
