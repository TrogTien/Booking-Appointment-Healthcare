import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/model/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-medical-field',
  templateUrl: './medical-field.component.html',
  styleUrls: ['./medical-field.component.scss']
})
export class MedicalFieldComponent implements OnInit {
  doctors: Doctor[] = [];
  medical: string = "Cardiology";

  typesOfShoes: string[] = ['Nhi khoa', 'Thần kinh học', 'Tim mạch', 'Nha khoa', 'Da liễu'];
  longText = `Trưởng khoa Khám bệnh, Bệnh viện Đa khoa Quốc tế Thu Cúc
  Nguyên chủ nhiệm khoa thần kinh, Bệnh viện Hữu Nghị Việt Xô
  Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh
  Bác sĩ khám cho người bệnh từ 16 tuổi trở lên`;

  constructor(
    private roleService: RoleService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.roleService.setRole();
    
    this.doctorService.getDoctorMedical(this.medical).subscribe(_doctors => {
      this.doctors = _doctors
    })
    
  }

  onChangeMedical(_medical: string) {
    this.doctorService.getDoctorMedical(_medical).subscribe(_doctors => {
      this.doctors = _doctors
    })
  }
}
