import {Directive, ElementRef, HostListener, Renderer,AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appViewResize]'
})

export class ViewResizeDirective implements AfterViewInit {

  constructor(private el:ElementRef, private renderer:Renderer) {

  }

  @HostListener('resize') onResize() {
    this.changeViewSize();
  }

  ngAfterViewInit() {
    this.changeViewSize();
  }

  public changeViewSize() {
    this.renderer.setElementStyle(this.el.nativeElement, "height", window.innerHeight + 'px');
  }

}
