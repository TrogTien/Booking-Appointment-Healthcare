import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../guards/auth.guard';
import { loginGuard } from '../guards/login.guard';
import { adminGuard } from '../guards/admin.guard';

import { HomeComponent } from './pages/home/home.component';
// import { LoginComponent } from './pages/login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { MedicalFieldComponent } from './pages/medical-field/medical-field.component';
// import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { BookingComponent } from './pages/booking/booking.component';
import { RequestDoctorComponent } from './pages/request-doctor/request-doctor.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UserComponent } from './pages/user/user.component';
import { MyInformationComponent } from './pages/user/my-information/my-information.component';
import { MyHistoryComponent } from './pages/user/my-history/my-history.component';
import { UserAppointmentComponent } from './pages/user/user-appointment/user-appointment.component';




const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { 
        path: 'booking/:doctorId', component: BookingComponent,
        canActivate: [authGuard]
      },
      { path: 'doctors', component: DoctorsComponent},
      { path: 'doctors/:doctorId', component: DoctorDetailComponent},
      { path: 'medical-field/:medicalId', component: MedicalFieldComponent},
      { path: 'medical-field', component: MedicalFieldComponent},
      { path: 'request-doctor', component: RequestDoctorComponent,     
        canActivate: [authGuard, adminGuard],
        data: {  expectedRoles: ["user"] }
      },
      {
        path: 'user',
        component: UserComponent,
        children: [
          { path: '', redirectTo: 'my-information', pathMatch: 'full' },
          { path: 'my-information', component: MyInformationComponent},
          { path: 'my-history', component: MyHistoryComponent},
          { path: 'user-appointment', component: UserAppointmentComponent}
        ]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
