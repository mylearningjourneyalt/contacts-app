import { AbstractControl, ValidationErrors } from '@angular/forms';
//Just a function that takes a control as a parameter
//AbstractControl can be applied to formcontrol or formgroup
export function restrictedWordsValidator(words: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalidWordCheck = words
      .map((w) => (control.value.includes(w) ? w : null))
      .filter((w) => w !== null);
    return invalidWordCheck.length > 0 ? { restrictedWords: invalidWordCheck.join(',') } : null;
  };
}

// export function restrictedWordsValidator(
//     control: AbstractControl
//   ): ValidationErrors | null {
//     return control.value.includes('foo') ? { restrictedWords: true } : null;
//   }
