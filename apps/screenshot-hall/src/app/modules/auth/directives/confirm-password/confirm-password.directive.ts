import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[screenshotHallConfirmPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordDirective,
      multi: true,
    },
  ],
})
export class ConfirmPasswordDirective implements Validator {
  @Input('screenshotHallConfirmPassword') public value: string;

  public validate(control: AbstractControl): ValidationErrors | null {
    return control.value === this.value
      ? null
      : { passwordMismatch: { value: control.value } };
  }
}
