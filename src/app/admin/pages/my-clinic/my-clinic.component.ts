import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AvailableTime, Doctor } from 'src/app/model/doctor.model';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-my-clinic',
  templateUrl: './my-clinic.component.html',
  styleUrls: ['./my-clinic.component.scss']
})
export class MyClinicComponent implements OnInit {
  doctor: Doctor | undefined;
  availableTimes$: Observable<AvailableTime[]> | undefined;

  doctorId: string = '';
  
  weekDays: Date[] | undefined;
  selectedDate = 0;

  medicals: string[] = []; // get medical từ medical


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`;

  constructor(
    private builder: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthService,
    private medicalService: MedicalFieldService,
    private timeService: TimeService

  ) {}

  ngOnInit(): void {
    this.weekDays = this.getWeekDaysFromNow();  // Create 7 day from now to select
    const userId = this.authService.getUserId();  

    this.availableTimes$ = this.timeService.availableTimes$;

    this.medicalService.getAllMedical().subscribe((data: any[] )=> {  // Get medical to select
      this.medicals = data.map(item => item.name);
    })
    
    this.doctorService.getDoctorByUserId(userId!).subscribe(_doctor => {  // Get Doctor
      this.doctor = _doctor;
      this.doctorId = _doctor._id;
      
      this.timeService.fetchDayTime(this.doctor.availableTimes);      // Time Service
      
      this.clinicForm.controls['name'].setValue(this.doctor?.name!);
      this.clinicForm.controls['medicalSpecialty'].setValue(this.doctor?.medicalSpecialty); //call get medical từ doctor
      this.clinicForm.controls['address'].setValue(this.doctor?.address!);
      this.clinicForm.controls['price'].setValue(this.doctor?.price!);
      this.clinicForm.controls['content'].setValue(this.doctor?.content!);

    })

    const now = new Date();




  }

  clinicForm = this.builder.group({
    name: ['', Validators.required],
    medicalSpecialty: [ [''], Validators.required],
    address: ['', Validators.required],
    price: [100000, Validators.required],
    content: [this.longText]
  })

  timeForm = this.builder.group({
    inputTime: ['']
  })


  getWeekDaysFromNow(): Date[] {
    const weekDays = [];
    for (let i = 0 ; i < 7; i++) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + i);
      weekDays.push(date);
    }

    return weekDays;
  }

  onSubmit() {
    if (this.clinicForm.valid) {
      this.doctorService.patchDoctor(this.doctorId, this.clinicForm.value).subscribe(() => {
        console.log("Update Successfully");
      })
      // console.log(this.clinicForm.value)
    } else {
      console.warn("Invalid")
    }
  }

  clearInput() {
    this.timeForm.controls['inputTime'].setValue('');
  }

  addHourDoctor(event: Event) {
    event.preventDefault();
    if (this.weekDays && this.timeForm.controls.inputTime.value) {
      const day = this.weekDays[this.selectedDate].toISOString();
      const hour = this.timeForm.controls.inputTime.value;
      const data = {
        day: day,
        hour: hour
      }

      this.doctorService.patchHourDoctor(this.doctorId, data).subscribe(() => {
        console.log("Thêm giờ thành công")
        this.timeService.addHour(day, hour);
      })

    }
  }

  OnChangeDay(day: Date) {
    this.timeService.changeDay(day.toISOString());
    console.log("change: ", day.toISOString());
  }



}
