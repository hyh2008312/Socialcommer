import {Directive,EventEmitter,ElementRef,HostListener,Output, NgZone} from '@angular/core';

@Directive({
  selector: '[appViewScroll]'
})

export class ViewScrollDirective {

  @Output() onScrollChange = new EventEmitter();

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) {
    // now, we can reference to: this.element
  }


  @HostListener('mouseover') onMouseOver() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      let part = self.element.nativeElement.querySelector('.xb-store__details-buttons');

      if(self.element.nativeElement.scrollTop > part.offsetTop) {
        self.scroll(true);
      } else {
        self.scroll(false);
      }
    });
  }

  @HostListener('touchstart') onTouchStart() {

  }

  @HostListener('touchmove') onTouchMove() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
      let part = self.element.nativeElement.querySelector('.xb-store__details-buttons');
      if(self.element.nativeElement.scrollTop > part.offsetTop) {
        self.scroll(true);
      } else {
        self.scroll(false);
      }
    });
  }

  scroll(scrolledUp:boolean) {
    this.onScrollChange.emit(scrolledUp);
  }

}
