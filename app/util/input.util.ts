import { FormGroup } from "@angular/forms";

export function isFieldInvalid(form: FormGroup, field: string | Array<string>): boolean {
  const fieldControl = form.get(field);
  return fieldControl.invalid && (fieldControl.dirty || fieldControl.touched);
}

export function keyPressPattern(event: KeyboardEvent, pattern: RegExp) {
  const inputChar = event.key;

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

export function ConfirmedValidator(password: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const matchingControl = formGroup.controls[confirmPassword];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
    }
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
    } else {
        matchingControl.setErrors(null);
    }
}
}
