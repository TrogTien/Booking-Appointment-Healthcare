import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Doctor } from 'src/app/model/doctor.model';
import { DialogDoctorComponent } from '../dialog-doctor/dialog-doctor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.scss']
})
export class DoctorItemComponent implements OnInit {
  @Input() doctor: Doctor | undefined;
  @Output() deleteDoctor: EventEmitter<string> = new EventEmitter<string>();

  imageUrl: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.doctor?.image) {
      this.imageUrl = "http://localhost:3000/" + this.doctor.image
    } else {
      this.imageUrl = "http://localhost:3000/uploads/avatarDoctor.jpg"
    }
  }

  openDialog() {
    this.dialog.open(DialogDoctorComponent, {
      width: '50%',
      data: this.doctor
    })
  }

  removeDoctor(event: Event) {
    event.stopPropagation();
    this.deleteDoctor.emit(this.doctor?._id);
  }



}
