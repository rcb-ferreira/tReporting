import { NgModule } from '@angular/core';
import { SecToMinPipe } from './sec-to-min.pipe';
import { TrmDate } from './trm-date.pipe';

@NgModule({
    imports: [],
    declarations: [SecToMinPipe, TrmDate],
    exports: [SecToMinPipe, TrmDate]
})
export class SharedPipesModule {}
