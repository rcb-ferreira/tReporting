import { Directive, Input, ElementRef, OnInit } from '@angular/core';

const colours = [
    '#FFFFFF00', // normal
    '#25DFFC', // blue
    '#66FF33', // green
    '#FFCC00', // yellow
    '#FF8132', // orange
    '#ff6088', // pink
    '#ff3030' // red
];

const durationInterval = 600; // 10 min

@Directive({
    selector: '[appColourHandler]'
})
export class ColourHandlerDirective implements OnInit {

    @Input() interval: any;
    @Input() time: any;
    constructor(public elr: ElementRef) {}

    ngOnInit() {
        this.setColour(this.elr);
    }

    setColour(elr) {
        let colourIndex = Math.ceil(this.time / (this.interval * durationInterval));
        const colourLen = colours.length - 1;

        if (colourIndex >= colourLen) {
            colourIndex = colourLen;
        }

        elr.nativeElement.parentNode.style.background = colours[colourIndex];
    }
}
