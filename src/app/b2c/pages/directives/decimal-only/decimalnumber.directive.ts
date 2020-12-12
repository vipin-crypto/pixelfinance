import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appDecimalnumber]'
})
export class DecimalnumberDirective {
  // private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // constructor(
  //   private _el: ElementRef) { }
  // @HostListener('input', ['$event']) onInputChange(event) {
  //   const initalValue = this._el.nativeElement.value;
  //   console.log(initalValue);

  //   this._el.nativeElement.value = initalValue.replace(/[^0-9\.]*/g, '');
  //   console.log(this._el.nativeElement.value)
  //   if ( initalValue !== this._el.nativeElement.value) {
     
  //     event.stopPropagation();
  //   }
  // }

    private regex: RegExp = new RegExp(/^\d*\.?\d{0,1}$/g);
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
    constructor(private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
      console.log(this.el.nativeElement.value);
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      let current: string = this.el.nativeElement.value;
      const position = this.el.nativeElement.selectionStart;
      const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
}
