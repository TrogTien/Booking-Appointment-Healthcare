import { Component, OnInit } from '@angular/core';
import { MedicalField } from 'src/app/model/medical_field.model';
import { ApiService } from 'src/app/services/api.service';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  medicals: MedicalField[] = []

  constructor(
    private medicalService: MedicalFieldService,
    private toast: NgToastService 

  ) {}

  ngOnInit(): void {
    this.medicalService.getAllMedical().subscribe(_medicals => {
      this.medicals = _medicals;
      console.log(this.medicals)
    })
  }

  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:'Your Success Message', duration:2000});
  }
  

}
