import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MedicalComponent } from './pages/medical/medical.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { RequestDoctorComponent } from './pages/request-doctor/request-doctor.component';
import { MyClinicComponent } from './pages/my-clinic/my-clinic.component';
import { UnconfirmedAppointmentsComponent } from './pages/appointments/unconfirmed-appointments/unconfirmed-appointments.component';
import { ConfirmedAppointmentsComponent } from './pages/appointments/confirmed-appointments/confirmed-appointments.component';
import { CompletedAppointmentsComponent } from './pages/appointments/completed-appointments/completed-appointments.component';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [
  { 
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'doctors', component: DoctorsComponent,
        canActivate: [adminGuard],
        data: { expectedRoles: ["admin"] }
      },
      { 
        path: 'appointments', 
        component: AppointmentsComponent,
        children: [
          { path: '', redirectTo: 'unconfirmed', pathMatch: 'full'},
          { path: 'unconfirmed', component: UnconfirmedAppointmentsComponent},
          { path: 'confirmed', component: ConfirmedAppointmentsComponent},
          { path: 'completed', component: CompletedAppointmentsComponent},

        ],
        canActivate: [adminGuard],
        data: { expectedRoles: ["doctor"] }
      },
      { path: 'medical', component: MedicalComponent,
        canActivate: [adminGuard],
        data: { expectedRoles: ["admin"] }
      },
      { path: 'request-doctor', component: RequestDoctorComponent,
        canActivate: [adminGuard],
        data: { expectedRoles: ["admin"] }
      },
      { path: 'my-clinic', component: MyClinicComponent,
        canActivate: [adminGuard],
        data: { expectedRoles: ["doctor"] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
