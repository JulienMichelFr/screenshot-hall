import { Directive, ElementRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'img' })
export class LazyImgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}
