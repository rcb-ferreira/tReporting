import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersComponent } from './filters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, NgbModule, FormsModule],
    declarations: [FiltersComponent],
    exports: [FiltersComponent]
})
export class FiltersModule {}
