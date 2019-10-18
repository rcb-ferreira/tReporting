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
                data: { title: 'agent' }
            },
            {
                path: 'group',
                component: DistributionComponent,
                data: { title: 'group' }
            },
            {
                path: 'hourly',
                component: DistributionComponent,
                data: { title: 'hourly' }
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
