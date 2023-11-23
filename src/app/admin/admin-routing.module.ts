import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MedicalComponent } from './pages/medical/medical.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { RequestDoctorComponent } from './pages/request-doctor/request-doctor.component';
import { MyClinicComponent } from './pages/my-clinic/my-clinic.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'doctors', component: DoctorsComponent},
      { path: 'appointments', component: AppointmentsComponent},
      { path: 'medical', component: MedicalComponent},
      { path: 'request-doctor', component: RequestDoctorComponent},
      { path: 'my-clinic', component: MyClinicComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
