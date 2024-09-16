import { Directive, ElementRef, forwardRef, HostListener, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

//allows angular to use this where appropriate
const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true
}

//target all input elements of type date
//also only if they have a form control name directive, formControl directive, or ngModel Directive
@Directive({
  selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]',
  providers: [DATE_VALUE_PROVIDER]
})
//Control Value Accessor is responsible for updating the value of the form control value when its value changes
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }
//https://app.pluralsight.com/ilx/video-courses/739e63f1-c84d-48eb-bc9a-bdd1428bc8e9/de97b303-0ae7-4b81-9d67-c0f90da70349/07056570-11ea-4f5d-b6b0-89bc30224780
  @HostListener('input', ['$event.target.valueAsDate'])
  private onChnange!: Function;

  registerOnChange(fn: Function): void {
    this.onChnange = (valueAsDate: Date) =>{
      fn(valueAsDate);
    }
  }
  
  @HostListener('blur', ['$event.target.valueAsDate'])
  private onTouched!: Function;
  registerOnTouched(fn: Function): void {
      this.onTouched = fn;
  }

  writeValue(newValue: any): void {
      //yyyy-mm-dd
      if(newValue instanceof Date){
        this.element.nativeElement.value = newValue ? newValue.toISOString().split('T')[0] : '';
      }
  }


}
