import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from 'src/app/model/doctor.model';
import { DialogDoctorComponent } from '../dialog-doctor/dialog-doctor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.scss']
})
export class DoctorItemComponent {
  @Input() doctor: Doctor | undefined;
  @Output() deleteDoctor: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogDoctorComponent, {
      width: '50%',
      data: this.doctor
    })
  }

  removeDoctor() {
    this.deleteDoctor.emit(this.doctor?._id);
  }



}
