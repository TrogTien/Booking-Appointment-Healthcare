import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';





import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MedicalComponent } from './pages/medical/medical.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { DialogAppointmentComponent } from './pages/appointments/dialog-appointment/dialog-appointment.component';
import { AppointmentItemComponent } from './pages/appointments/appointment-item/appointment-item.component';
import { DoctorItemComponent } from './pages/doctors/doctor-item/doctor-item.component';
import { DialogDoctorComponent } from './pages/doctors/dialog-doctor/dialog-doctor.component';
import { RequestDoctorComponent } from './pages/request-doctor/request-doctor.component';
import { RequestItemComponent } from './pages/request-doctor/request-item/request-item.component';
import { DialogRequestComponent } from './pages/request-doctor/dialog-request/dialog-request.component';
import { MyClinicComponent } from './pages/my-clinic/my-clinic.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    MedicalComponent,
    DashboardComponent,
    DoctorsComponent,
    DialogComponent,
    AppointmentsComponent,
    DialogAppointmentComponent,
    AppointmentItemComponent,
    DoctorItemComponent,
    DialogDoctorComponent,
    RequestDoctorComponent,
    RequestItemComponent,
    DialogRequestComponent,
    MyClinicComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule
  ],
})
export class AdminModule { }
