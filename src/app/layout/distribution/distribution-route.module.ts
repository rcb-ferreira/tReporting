import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributionComponent } from './distribution.component';

const routes: Routes = [
    {
        path: '',
        component: DistributionComponent,
        children: [
            {
                path: 'agent',
                component: DistributionComponent,
                data: { title: 'Agent distribution', type: 'agent' }
            },
            {
                path: 'group',
                component: DistributionComponent,
                data: { title: 'Group distribution', type: 'group' }
            },
            {
                path: 'hourly',
                component: DistributionComponent,
                data: { title: 'Hourly distribution', type:'hourly' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DistributionRoutingModule {
}
