import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DialogAppointmentComponent } from '../dialog-appointment/dialog-appointment.component';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.scss']
})
export class AppointmentItemComponent implements OnInit {
  @Input() appointment: Appointment | undefined;
  isConfirmed: boolean = true;

  

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
    if (this.appointment?.status === "chưa xác nhận") {
      this.isConfirmed = false;
    }
  }

  openDialog() {
    this.dialog.open(DialogAppointmentComponent, {
      width: '50%',
      data: this.appointment
    });
  }

  changeStatus(newStatus: string) {
    this.isConfirmed = !this.isConfirmed
    if (this.appointment) {
      const newData = {
        ... this.appointment,
        status: newStatus
      }

      console.log(newData)

      this.appointmentService.patchAppointment(this.appointment._id, { status: newStatus}).subscribe(() => {
        const index = this.appointmentService.appointments.findIndex(item => item._id == this.appointment?._id)
        this.appointmentService.appointments.splice(index, 1, newData) //Next()
      })

    }
  }

  removeAppointment() {
    this.appointmentService.deleteAppointment(this.appointment?._id!).subscribe(() => {
      const index = this.appointmentService.appointments.findIndex(item => item._id == this.appointment?._id)
      this.appointmentService.appointments.splice(index, 1)
      
    })
  }


}
