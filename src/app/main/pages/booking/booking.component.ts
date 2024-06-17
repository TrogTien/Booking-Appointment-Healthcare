import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { LoadingOverplayComponent } from 'src/app/components/loading-overplay/loading-overplay.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  doctorId: string = '';
  day: string = '';
  hour: string = '';
  doctorName: string = '';
  price: number = 0;

  imageUrl: string = '';

  isLoading: boolean = false;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private router: Router,
    private toast: NgToastService,
    private dialog: MatDialog 


  ) {}

  ngOnInit(): void {
    // check login
    // this.authService.checkLogin().subscribe(() => {
    //   console.log("Check Login")
    // })

    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
    this.day = this.route.snapshot.queryParamMap.get('day')!;
    this.hour = this.route.snapshot.queryParamMap.get('hour')!;

    this.doctorService.getDoctor(this.doctorId).subscribe( doctor => {
      this.doctorName = doctor.name;
      this.price = doctor.price;
      if (doctor.image) {
        this.imageUrl = "http://localhost:3000/" + doctor.image;
      } else {
        this.imageUrl = "http://localhost:3000/uploads/avatarDoctor.jpg"
      }
    })

  }

  bookingForm = this.builder.group({
    patientName: ['', Validators.required],
    gender: ['male', Validators.required],
    birthday: [new Date('1995-01-01'), Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    symptoms: ['']
  })

 

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'Không được để trống' : '';
  }

  onSubmit() {
    if(this.bookingForm.valid) {
      this.showLoadingOverlay();
      const userId = this.authService.getUserId();
      const data = {
        ... this.bookingForm.value,
        birthday: this.bookingForm.value.birthday?.toISOString(),
        day: this.day,
        appointmentTime: this.hour,
        doctorId: this.doctorId,
        price: this.price,
        status: "chưa xác nhận",
        userId
      }

      this.appointmentService.postAppointment(data).subscribe({
        next: (data) => {
          this.dialog.closeAll();
          this.showSuccess();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.dialog.closeAll();
          this.showError(err.error);
          this.router.navigate(['/doctors', this.doctorId]);
        }
      });
      
    } else {
      console.warn('Invalid')
    }
  }

  showSuccess() {
    this.toast.success({detail:"Thành công",summary:'Đã gửi thông tin', duration:2000});
  }

  showError(message: string) {
    this.toast.error({ detail: "Lỗi", summary: message, duration: 2000 })
  }

  showLoadingOverlay() {
    this.dialog.open(LoadingOverplayComponent);
  }

}
