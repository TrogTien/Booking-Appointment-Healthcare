import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  doctorId: string = '';
  day: string = '';
  hour: string = '';

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // check login
    // this.authService.checkLogin().subscribe(() => {
    //   console.log("Check Login")
    // })

    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
    this.day = this.route.snapshot.queryParamMap.get('day')!;
    this.hour = this.route.snapshot.queryParamMap.get('hour')!;
  }

  bookingForm = this.builder.group({
    patientName: ['', Validators.required],
    gender: ['male', Validators.required],
    birthday: [new Date(), Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    symptoms: ['']
  })

 

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'Không được để trống' : '';
  }

  onSubmit() {
    if(this.bookingForm.valid) {
      const data = {
        ... this.bookingForm.value,
        birthday: this.bookingForm.value.birthday?.toISOString(),
        day: this.day,
        appointmentTime: this.hour,
        doctorId: this.doctorId,
        price: 50000,
        status: "chưa xác nhận"
      }

      this.appointmentService.postAppointment(data).subscribe( data => {
        alert('Đã gửi thông tin, chờ xác nhận')
      });

      
    } else {
      console.warn('Invalid')
    }
  }
}
