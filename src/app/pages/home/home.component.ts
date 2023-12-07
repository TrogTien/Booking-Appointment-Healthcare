import { Component, OnInit } from '@angular/core';
import { MedicalField } from 'src/app/model/medical_field.model';
import { ApiService } from 'src/app/services/api.service';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/model/doctor.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  medicals: MedicalField[] = [];
  doctors: Doctor[] = [];

  constructor(
    private medicalService: MedicalFieldService,
    private toast: NgToastService,
    private router: Router,
    private doctorService: DoctorService 

  ) {}

  ngOnInit(): void {
    this.medicalService.getAllMedical().subscribe(_medicals => {
      this.medicals = _medicals;
      console.log(this.medicals)
    })

    this.doctorService.getAllDoctor('', 1, 8).subscribe(res => {
      this.doctors = res.doctors;
    })
  }


  
  

}
