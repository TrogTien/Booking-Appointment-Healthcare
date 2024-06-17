import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
// import { LoginComponent } from './pages/login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { MedicalFieldComponent } from './pages/medical-field/medical-field.component';
import { SliderComponent } from '../components/slider/slider.component';
import { SliderItemDirective } from '../components/slider/slider-item.directive';
// import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { BookingComponent } from './pages/booking/booking.component';
import { RequestDoctorComponent } from './pages/request-doctor/request-doctor.component';
import { DoctorItemComponent } from './pages/doctors/doctor-item/doctor-item.component';
import { MedicalItemComponent } from './pages/medical-field/medical-item/medical-item.component';
import { ToastMessageComponent } from '../components/toast-message/toast-message.component';
import { LoadingOverplayComponent } from '../components/loading-overplay/loading-overplay.component';
import { ItemHourComponent } from './pages/doctor-detail/item-hour/item-hour.component';
import { ReviewsComponent } from './pages/doctor-detail/reviews/reviews.component';
import { RatingComponent } from './pages/doctor-detail/reviews/rating/rating.component';
import { ReviewItemComponent } from './pages/doctor-detail/reviews/review-item/review-item.component';
import { MyInformationComponent } from './pages/user/my-information/my-information.component';
import { MyHistoryComponent } from './pages/user/my-history/my-history.component';
import { UserComponent } from './pages/user/user.component';
import { UserAppointmentComponent } from './pages/user/user-appointment/user-appointment.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    // LoginComponent,
    DoctorsComponent,
    MedicalFieldComponent,
    SliderComponent,
    SliderItemDirective,
    // SignUpComponent,
    DoctorDetailComponent,
    BookingComponent,
    RequestDoctorComponent,
    DoctorItemComponent,
    MedicalItemComponent,
    ToastMessageComponent,
    LoadingOverplayComponent,
    ItemHourComponent,
    ReviewsComponent,
    RatingComponent,
    ReviewItemComponent,
    MyInformationComponent,
    MyHistoryComponent,
    UserComponent,
    UserAppointmentComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxPaginationModule,
    MatMenuModule
  ]
})
export class MainModule { }
