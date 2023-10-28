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




import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MedicalComponent } from './pages/medical/medical.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    MedicalComponent,
    DashboardComponent,
    DoctorsComponent,
    DialogComponent,
    AppointmentsComponent
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
    MatInputModule
  ],
})
export class AdminModule { }
