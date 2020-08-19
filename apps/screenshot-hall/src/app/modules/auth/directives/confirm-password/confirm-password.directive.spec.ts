import { ConfirmPasswordDirective } from './confirm-password.directive';
import { AbstractControl, FormControl } from '@angular/forms';

describe('ConfirmPasswordDirective', () => {
  let directive: ConfirmPasswordDirective;
  let control: AbstractControl;

  beforeEach(() => {
    directive = new ConfirmPasswordDirective();
    control = new FormControl();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate correct value', () => {
    directive.value = 'my-password';
    control.setValue('my-password');
    expect(directive.validate(control)).toEqual(null);
  });

  it('should return error when password mismatch', () => {
    directive.value = 'my-password';
    control.setValue('my-password1');
    expect(directive.validate(control)).toEqual({ passwordMismatch: { value: 'my-password1' } });
  });
});
