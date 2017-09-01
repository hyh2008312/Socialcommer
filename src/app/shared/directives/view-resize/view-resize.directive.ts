import {Directive, ElementRef, Renderer, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appViewResize]'
})

export class ViewResizeDirective implements AfterViewInit {

  constructor(private el:ElementRef, private renderer:Renderer) {

  }

  ngAfterViewInit() {
    this.changeViewSize();
    let self = this;

    this.changeViewSize();

    window.onresize = function() {
      self.changeViewSize();
    };
  }

  public changeViewSize() {
    this.renderer.setElementStyle(this.el.nativeElement, "height", window.innerHeight + 'px');
  }

}
