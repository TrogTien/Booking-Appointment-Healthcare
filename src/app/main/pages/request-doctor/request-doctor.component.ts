import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoadingOverplayComponent } from 'src/app/components/loading-overplay/loading-overplay.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestDoctorService } from 'src/app/services/request-doctor.service';

@Component({
  selector: 'app-request-doctor',
  templateUrl: './request-doctor.component.html',
  styleUrls: ['./request-doctor.component.scss']
})
export class RequestDoctorComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private requestDoctorService: RequestDoctorService,
    private router: Router,
    private toast: NgToastService,
    private dialog: MatDialog 

  ) {}

  ngOnInit(): void {
    
  }

  requestDoctorForm = this.builder.group({
    doctorName: ['', Validators.required],
    birthday: [new Date('1990-01-01'), Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    content: ['', Validators.required]
  })

 

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'Không được để trống' : '';
  }

  onSubmit() {
    if(this.requestDoctorForm.valid) {
      this.showLoadingOverlay();
      const userId = this.authService.getUserId();
      const data = {
        ... this.requestDoctorForm.value,
        userId
      }

      this.requestDoctorService.postRequestDoctor(data).subscribe({
        next: (data) => {
          this.dialog.closeAll();
          this.showSuccess();
          this.router.navigate(['/home'])
        },
        error: (err) => {
          this.dialog.closeAll();
          this.showError();
        }
      })
   

      
    } else {
      console.warn('Invalid')
    }
  }

  showError() {
    this.toast.error({ detail: "Lỗi", summary: "Yêu cầu bị lỗi", duration: 2000 })
  }

  showSuccess() {
    this.toast.success({ detail: "Thành công", summary: "Yêu cầu của bạn đã được gửi", duration: 2000})
  }

  showLoadingOverlay() {
    this.dialog.open(LoadingOverplayComponent);
  }
}
