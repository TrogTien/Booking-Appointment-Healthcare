import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { MedicalFieldComponent } from './pages/medical-field/medical-field.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { adminGuard } from './guards/admin.guard';
import { RequestDoctorComponent } from './pages/request-doctor/request-doctor.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { 
    path: 'login', component: LoginComponent,
    canActivate: [loginGuard]
  },
  { 
    path: 'signup', component: SignUpComponent,
    canActivate: [loginGuard]
  },
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
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard],
    data: { expectedRoles: ["admin", "doctor"] }
  },
  {
    path: '**', component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
