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
  styleUrls: ['./medical-field.component.scss']
})
export class MedicalFieldComponent implements OnInit {
  doctors: Doctor[] = [];

  medicals: MedicalField[] | undefined; // get medical từ medical
  medical: MedicalField | undefined;

  medicalImage: string = ''


  longText = `Trưởng khoa Khám bệnh, Bệnh viện Đa khoa Quốc tế Thu Cúc
  Nguyên chủ nhiệm khoa thần kinh, Bệnh viện Hữu Nghị Việt Xô
  Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nhi
  Bác sĩ khám cho người bệnh dưới 16 tuổi`;

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
      if (_medicalId) {
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

  onChangeMedical(_medicalId: any) {
    this.medicalService.getMedical(_medicalId).subscribe(medicalItem => {
      this.medical = medicalItem;                                                  // Show image medical
      if (this.medical?.image) {
        this.medicalImage = "http://localhost:3000/" + this.medical.image;
      } else {
        this.medicalImage = "http://localhost:3000/uploads/medical.jpg"
      }
    })
    this.doctorService.getDoctorMedical(_medicalId).pipe(
      map(doctors => doctors.filter((doctor: Doctor) => {
        return doctor.isActive === true
      }))
    ).subscribe(_doctors => {       // Show list doctors
      this.doctors = _doctors
    })
  }

  

  trackByFn(index: number, doctor: Doctor) {
    return doctor._id;
  }
}
