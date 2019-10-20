import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallComponent } from './call.component';

const routes: Routes = [
    {
        path: '',
        component: CallComponent,
        children: [
            {
                path: 'trail',
                component: CallComponent,
                data: { title: 'Trail' }
            },
            {
                path: 'interaction',
                component: CallComponent,
                data: { title: 'Interaction' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CallRoutingModule {
}