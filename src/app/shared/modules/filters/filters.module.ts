import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersComponent } from './filters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, NgbModule],
    declarations: [FiltersComponent],
    exports: [FiltersComponent]
})
export class FiltersModule {}
