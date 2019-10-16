import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss'],
    animations: [routerTransition()]
})
export class CallComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
