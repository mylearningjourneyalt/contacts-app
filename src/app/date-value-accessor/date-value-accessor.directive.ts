import { Directive } from '@angular/core';

//target all input elements of type date
//also only if they have a form control name directive, formControl directive, or ngModel Directive
@Directive({
  selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]',
})
export class DateValueAccessorDirective {

  constructor() { }

}
