import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-classstyle]'
})
export class ClassDirective implements OnInit {

  @Input() elementclass: string = '';
  @Input() flag: boolean = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    if (this.flag) {
      this.renderer.addClass(this.element.nativeElement, this.elementclass);
    } else {
      this.renderer.removeClass(this.element.nativeElement, this.elementclass);
    }
  }

  public addClass(className: string, element: any) {
    this.renderer.addClass(element, className);
    // or use the host element directly
    // this.renderer.addClass(this.elementRef.nativeElement, className);
  }

  public removeClass(className: string, element: any) {
    this.renderer.removeClass(element, className);
  }
}