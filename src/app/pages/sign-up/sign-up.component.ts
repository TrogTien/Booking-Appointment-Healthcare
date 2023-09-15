import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;

  constructor(private builder: FormBuilder) {}

  signupForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    birthday: ['', Validators.required],
    address: ['', Validators.required],
  })

  logger() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
    } else {
      console.warn('Invalid')
    }
    
  }

  getErrorMessage(formControl: FormControl) {
    if(formControl.hasError('required')) {
      return 'Không được để trống'
    } 

    return formControl.hasError('email') ? 'Email không hợp lệ' : '';

    
    // if (this.email.hasError('required')) {
    //   return 'Không được để trống';
    // }

    // return this.email.hasError('email') ? 'Email không hợp lệ' : '';
  }
}
