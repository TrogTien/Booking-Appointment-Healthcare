import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-field',
  templateUrl: './medical-field.component.html',
  styleUrls: ['./medical-field.component.scss']
})
export class MedicalFieldComponent {
  typesOfShoes: string[] = ['Tiêu hóa', 'Thần kinh', 'Tim mạch', 'Nha khoa', 'Da liễu'];
  longText = `Trưởng khoa Khám bệnh, Bệnh viện Đa khoa Quốc tế Thu Cúc
  Nguyên chủ nhiệm khoa thần kinh, Bệnh viện Hữu Nghị Việt Xô
  Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh
  Bác sĩ khám cho người bệnh từ 16 tuổi trở lên`;
}
