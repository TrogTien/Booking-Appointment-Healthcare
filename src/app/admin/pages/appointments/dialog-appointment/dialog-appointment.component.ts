import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/appointment.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-dialog-appointment',
  templateUrl: './dialog-appointment.component.html',
  styleUrls: ['./dialog-appointment.component.scss']
})
export class DialogAppointmentComponent implements OnInit {
  doctorName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private doctorService: DoctorService,
    
  ) {}
  ngOnInit(): void {
    this.doctorService.getDoctor(this.data.doctorId).subscribe(doctor => {
      this.doctorName = doctor.name;
    })
  }

}
