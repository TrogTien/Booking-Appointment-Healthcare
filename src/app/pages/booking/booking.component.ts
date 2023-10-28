import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

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
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
    this.day = this.route.snapshot.queryParamMap.get('day')!;
    this.hour = this.route.snapshot.queryParamMap.get('hour')!;
  }

  signupForm = this.builder.group({
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
    if(this.signupForm.valid) {
      const data = {
        ... this.signupForm.value,
        birthday: this.signupForm.value.birthday?.toISOString(),
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
