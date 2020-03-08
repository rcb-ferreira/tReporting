import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appLinkHandler]'
})
export class LinkHandlerDirective {

  @Input() drill: string;
  constructor(readonly router: Router) { }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    this.handleRouting(this.drill);
  }

  handleRouting(url) {
    if (!url) {
      return;
    }
    console.log(url);

    if (url.match(/\/group\/heatmap\//gi)) {
      const segments = url.split('/');
      this.router.navigateByUrl(`/heatmap/group?group=${segments[4]}`);
    } else if (url.match(/\/agent\/distribution\//gi)) {
      const segments = url.split('/');
      this.router.navigateByUrl(`/heatmap/agent?agent=${segments[4]}`);
    } else if (url.match(/\/interaction\/day/gi)) {
      this.router.navigateByUrl(`/call/interaction/day`);
    } else if (url.match(/\/interaction\/hour/gi)) {
      const day = url.split('/')[4];
      this.router.navigateByUrl(`/call/interaction/hour/${day}`);
    }
  }

}
