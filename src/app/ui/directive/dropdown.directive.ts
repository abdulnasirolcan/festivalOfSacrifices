import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[clickOutside]',
})

export class ClickOutsideDirective {
    @Output() public clickOutside = new EventEmitter();
    // tslint:disable-next-line: variable-name
    constructor(private _elementRef: ElementRef) {

    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!isClickedInside) {
            this.clickOutside.emit(null);
        }
    }
}