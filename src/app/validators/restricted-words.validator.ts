import { AbstractControl, ValidationErrors } from '@angular/forms';
//Just a function that takes a control as a parameter
//AbstractControl can be applied to formcontrol or formgroup
export function restrictedWordsValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.value.includes('foo') ? { restrictedWords: true } : null;
}
