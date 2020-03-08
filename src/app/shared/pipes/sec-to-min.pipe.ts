import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sec2min' })
export class SecToMinPipe implements PipeTransform {
    transform(value): string {

        const sec = parseInt(value, 10); // convert value to number if it's string
        const hours = Math.floor(sec / 3600); // get hours
        const minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        const seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds

        let time = ``;
        time += hours > 0 ? `${hours < 10 ? '0' + hours : hours}:` : '';
        time += minutes > 0 ? `${minutes < 10 ? '0' + minutes + ':' : minutes + ':'}` : '00:';
        time += seconds > 0 ? `${seconds < 10 ? '0' + seconds : seconds}` : '00';

        return time;
    }
}
