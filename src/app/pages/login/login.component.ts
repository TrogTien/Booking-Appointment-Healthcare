import { Component } from '@angular/core';
import { FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required)

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'Không được để trống';
    } else if (formControl.hasError('email')) {
      return 'Email không hợp lệ';
    }
    return '';

    // return formControl.hasError('email') ? 'Email không hợp lệ' : '';
  }
}
