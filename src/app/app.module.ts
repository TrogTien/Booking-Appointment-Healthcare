import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';




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



import { NgToastModule } from 'ng-angular-popup' // to be added
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module




import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { MedicalFieldComponent } from './pages/medical-field/medical-field.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderItemDirective } from './components/slider/slider-item.directive';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { WebReqInterceptor } from './services/web-req-interceptor';
import { RequestDoctorComponent } from './pages/request-doctor/request-doctor.component';
import { DoctorItemComponent } from './pages/doctors/doctor-item/doctor-item.component';
import { MedicalItemComponent } from './pages/medical-field/medical-item/medical-item.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { LoadingOverplayComponent } from './components/loading-overplay/loading-overplay.component';
import { ItemHourComponent } from './pages/doctor-detail/item-hour/item-hour.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    DoctorsComponent,
    MedicalFieldComponent,
    SliderComponent,
    SliderItemDirective,
    SignUpComponent,
    DoctorDetailComponent,
    BookingComponent,
    PageNotFoundComponent,
    RequestDoctorComponent,
    DoctorItemComponent,
    MedicalItemComponent,
    ToastMessageComponent,
    LoadingOverplayComponent,
    ItemHourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    NgToastModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
