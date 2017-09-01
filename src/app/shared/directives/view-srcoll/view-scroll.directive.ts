import {Directive,EventEmitter,ElementRef,HostListener,Output} from '@angular/core';

@Directive({
  selector: '[appViewScroll]'
})

export class ViewScrollDirective {

  @Output() onScrollChange = new EventEmitter();

  constructor(private element: ElementRef) {
    // now, we can reference to: this.element
  }

  private startX: number = 0;

  @HostListener('touchstart') onTouchStart() {
    this.startX = this.element.nativeElement.scrollTop;
  }

  @HostListener('touchmove') onTouchMove() {
    if(this.element.nativeElement.scrollTop > this.startX) {
      this.scroll(true);
    } else {
      this.scroll(false);
    }
  }

  scroll(scrolledUp:boolean) {
    this.onScrollChange.emit(scrolledUp);
  }

}
