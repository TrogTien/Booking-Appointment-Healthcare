import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    // this.authService.checkLogin().subscribe(() => {
    //   this.authService.isLoggedIn = true;
    //   console.log("check ",this.authService.isLoggedIn)
    // })
  }

  loginForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  
  })
  


  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'Không được để trống';
    } else if (formControl.hasError('email')) {
      return 'Email không hợp lệ';
    }
    return '';

    // return formControl.hasError('email') ? 'Email không hợp lệ' : '';
  }

  onSubmit() {
    if (this.loginForm.valid) { 
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).subscribe((res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.roleService.setRole();
          this.router.navigate(['/home']);
        }
        console.log(res); // Them neu sai thì cảnh báo
      })
    } else {
      console.warn('INVALID')
    }
  }
}
