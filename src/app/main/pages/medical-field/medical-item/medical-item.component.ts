import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/model/doctor.model';

@Component({
  selector: 'app-medical-item',
  templateUrl: './medical-item.component.html',
  styleUrls: ['./medical-item.component.scss']
})
export class MedicalItemComponent {
  @Input() doctorItem: Doctor | undefined;

  imageUrl: string = '';

  ngOnInit(): void {
    if (this.doctorItem?.image) {
      this.imageUrl = "http://localhost:3000/" + this.doctorItem.image;
    } else {
      this.imageUrl = "http://localhost:3000/uploads/avatarDoctor.jpg"
    }
  }

}
