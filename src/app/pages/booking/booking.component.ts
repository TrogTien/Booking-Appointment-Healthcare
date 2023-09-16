import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  constructor(private builder: FormBuilder) {}

  signupForm = this.builder.group({
    name: ['', Validators.required],
    birthday: ['', Validators.required],
    phone: ['', Validators.required],
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
    

    return formControl.hasError('required') ? 'Không được để trống' : '';

    
  }
}
