import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            { path: '', redirectTo: 'trail', pathMatch: 'prefix' },
            {
                path: 'trail',
                component: ReportsComponent,
                data: { title: 'Trail', type: 'trail' }
            },
            {
                path: 'interaction',
                component: ReportsComponent,
                data: { title: 'Interaction overview', type: 'overview' },
                children: [
                    {
                        path: 'day',
                        component: ReportsComponent,
                        data: { title: 'Interaction day', type: 'day' }
                    },
                    {
                        path: 'hour/:id',
                        component: ReportsComponent,
                        data: { title: 'Interaction hour', type: 'hour' }
                    }
                ]
            }
        ]
    },
    {
        path: '',
        component: ReportsComponent,
        children: [
            { path: '', redirectTo: 'agent', pathMatch: 'prefix' },
            {
                path: 'agent',
                component: ReportsComponent,
                data: { title: 'Agent distribution', type: 'agent' }
            },
            {
                path: 'group',
                component: ReportsComponent,
                data: { title: 'Group distribution', type: 'group' }
            },
            {
                path: 'hourly',
                component: ReportsComponent,
                data: { title: 'Hourly distribution', type: 'hours' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {
}
