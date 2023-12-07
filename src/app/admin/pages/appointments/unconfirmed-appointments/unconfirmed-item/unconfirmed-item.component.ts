import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DialogAppointmentComponent } from '../../dialog-appointment/dialog-appointment.component';

@Component({
  selector: 'app-unconfirmed-item',
  templateUrl: './unconfirmed-item.component.html',
  styleUrls: ['./unconfirmed-item.component.scss']
})
export class UnconfirmedItemComponent implements OnInit {
  @Input() appointment: Appointment | undefined;
  @Output() deleteAppointment: EventEmitter<string> = new EventEmitter<string>();

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

  changeStatus() {
    this.appointmentService.appointments = this.appointmentService.appointments.filter(item => item._id !== this.appointment?._id)

    const newStatus = "đã xác nhận";
    this.isConfirmed = !this.isConfirmed
    if (this.appointment) {
      const newData = {
        ... this.appointment,
        status: newStatus
      }


      this.appointmentService.patchAppointment(this.appointment._id, { status: newStatus}).subscribe(() => {
        console.log("Đã xác nhận")
      })

    }
  }

  removeAppointment() {
    this.deleteAppointment.emit(this.appointment?._id);
   
  }

}
