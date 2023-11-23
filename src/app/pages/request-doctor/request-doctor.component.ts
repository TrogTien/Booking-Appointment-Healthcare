import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  requestDoctorForm = this.builder.group({
    doctorName: ['', Validators.required],
    birthday: [new Date('1990-01-01'), Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    content: ['']
  })

 

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'Không được để trống' : '';
  }

  onSubmit() {
    if(this.requestDoctorForm.valid) {
      const userId = this.authService.getUserId();
      const data = {
        ... this.requestDoctorForm.value,
        userId
      }

      this.requestDoctorService.postRequestDoctor(data).subscribe(data => {
        alert("Đã gửi thông tin thành công");
        this.router.navigate(['/home'])
      })
   

      
    } else {
      console.warn('Invalid')
    }
  }

}
