import { Directive, forwardRef, Provider } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class DateValueAccessorDirective {

  constructor() { }

}
