import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/model/doctor.model';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { MedicalFieldService } from 'src/app/services/medical-field.service';

@Component({
  selector: 'app-my-clinic',
  templateUrl: './my-clinic.component.html',
  styleUrls: ['./my-clinic.component.scss']
})
export class MyClinicComponent implements OnInit {
  doctor: Doctor | undefined;
  doctorId: string = '';
  
  weekDays: Date[] | undefined;
  selectedDate = 0;

  medicals: string[] = []; // get medical từ medical


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`;

  constructor(
    private builder: FormBuilder,
    private doctorService: DoctorService,
    private authService: AuthService,
    private medicalService: MedicalFieldService

  ) {}

  ngOnInit(): void {
    this.weekDays = this.getWeekDaysFromNow();
    const userId = this.authService.getUserId();
    this.medicalService.getAllMedical().subscribe((data: any[] )=> {
      this.medicals = data.map(item => item.name);
    })
    this.doctorService.getDoctorByUserId(userId!).subscribe(_doctor => {
      this.doctor = _doctor;
      this.doctorId = _doctor._id;
      // console.log(this.doctor)
      
      this.clinicForm.controls['name'].setValue(this.doctor?.name!);
      this.clinicForm.controls['medicalSpecialty'].setValue(this.doctor?.medicalSpecialty); //call get medical từ doctor
      this.clinicForm.controls['address'].setValue(this.doctor?.address!);
      this.clinicForm.controls['price'].setValue(this.doctor?.price!);
      this.clinicForm.controls['content'].setValue(this.doctor?.content!);

    })




  }

  clinicForm = this.builder.group({
    name: ['', Validators.required],
    medicalSpecialty: [ [''], Validators.required],
    address: ['', Validators.required],
    price: [100000, Validators.required],
    content: [this.longText]
  })


  getWeekDaysFromNow(): Date[] {
    const weekDays = [];
    for (let i = 0 ; i < 7; i++) {
      const date = new Date();
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



}
