import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { Doctor } from 'src/app/model/doctor.model';
import { MedicalField } from 'src/app/model/medical_field.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-medical-field',
  templateUrl: './medical-field.component.html',
  styleUrls: ['./medical-field.component.scss'],
  animations: [
    trigger('hideAndShow', [
      
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ]),
  ]
})
export class MedicalFieldComponent implements OnInit {
  doctors: Doctor[] = [];

  medicals: MedicalField[] | undefined; // get medical từ medical
  medical: MedicalField | undefined;

  medicalImage: string = ''

  // Pagination
  page: number = 1;
  total: number = 0;
  limit: number = 2;

  constructor(
    private roleService: RoleService,
    private doctorService: DoctorService,
    private medicalService: MedicalFieldService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(): void {
    // this.roleService.setRole();
    this.route.paramMap.subscribe(params => {
      const _medicalId = params.get('medicalId');
      if (_medicalId) {                   // Home route -> medical with medicalId
        this.onChangeMedical(_medicalId);
      }
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0,0)
      }
    })
    
    this.medicalService.getAllMedical().subscribe((_medicals)=> {  // Get medical to select
      this.medicals = _medicals;
    })
    
    
    
  }

  getDoctorsByMedicalId(medicalId: string) {
    this.doctorService.getDoctorMedical(medicalId, this.page, this.limit).subscribe(res => {       // Show list doctors
      this.doctors = res.doctors
      this.total = res.total
      this.limit = res.limit
    })
  }

  onChangeMedical(_medicalId: string) {
    this.medicalService.getMedical(_medicalId).subscribe(medicalItem => {
      this.medical = medicalItem;                                                  // Show image medical
      if (this.medical?.image) {
        this.medicalImage = "http://localhost:3000/" + this.medical.image;
      } else {
        this.medicalImage = "http://localhost:3000/uploads/medical.jpg"
      }
    })
    
    this.getDoctorsByMedicalId(_medicalId);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getDoctorsByMedicalId(this.medical?._id!);

  }

  

  trackByFn(index: number, doctor: Doctor) {
    return doctor._id;
  }
}
