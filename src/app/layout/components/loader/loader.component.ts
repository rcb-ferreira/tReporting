import { Component } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    isLoading;

    constructor(private loaderService: LoaderService) {
        this.loaderService.isLoading.subscribe(val => {
            this.isLoading = val;
        });
    }
}
