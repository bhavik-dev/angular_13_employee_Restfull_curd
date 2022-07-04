import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[elementHighlight]'
})
export class ElementHighlightDirective implements OnInit {
  constructor(private eleRef: ElementRef) { }
  ngOnInit() { }

  @HostBinding('style.backgroundColor') backgroundColor: string = "transparent";

  @HostListener('mouseover') mouseover(eventData: Event) {
    this.backgroundColor = "Black";
    this.eleRef.nativeElement.style.color = "White";
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = "transparent";
    this.eleRef.nativeElement.style.color = "Black";
  }
}
