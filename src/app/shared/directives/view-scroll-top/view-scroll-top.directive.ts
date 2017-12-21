import {Directive, EventEmitter, ElementRef, HostListener, Output, Input, NgZone, AfterViewChecked, Inject} from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
@Directive({
  selector: '[appViewScrollTop]'
})

export class ViewScrollTopDirective {
  @Input() ContainerSelector: string = '';
  @Output() changeHidden = new EventEmitter<boolean>();
  ContainerDetail: any;

  constructor(private element: ElementRef,
              private ngZone: NgZone,
              @Inject(DOCUMENT)private document: Document
              ) {
    // now, we can reference to: this.element
  }

  ngAfterViewChecked() {
    if (this.ContainerDetail) {
      return;
    }
    this.ContainerDetail = this.document.querySelector(`.${this.ContainerSelector}`);
  }

  @HostListener('mouseover')
  onMouseOver() {
    let self = this;
    this.ngZone.runOutsideAngular(() => {
    });
  }

  public setScrollTop(): void {
    let self = this;
    this.ContainerDetail.scrollTop = 0 ;
  }
}
