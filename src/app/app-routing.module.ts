import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { MedicalFieldComponent } from './pages/medical-field/medical-field.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { BookingComponent } from './pages/booking/booking.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'doctors', component: DoctorsComponent},
  { path: 'doctor-detail', component: DoctorDetailComponent},
  { path: 'medical-field', component: MedicalFieldComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
