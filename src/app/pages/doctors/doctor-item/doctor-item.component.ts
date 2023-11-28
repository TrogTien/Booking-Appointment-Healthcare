import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/model/doctor.model';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.scss']
})
export class DoctorItemComponent implements OnInit {
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
