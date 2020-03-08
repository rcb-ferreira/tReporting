import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'trmDate' })
export class TrmDate implements PipeTransform {
    transform(value: string): string {
        return `${value.split(' ')[0]} ${value.split(' ')[1].slice(0, 8)}` ;
    }
}
