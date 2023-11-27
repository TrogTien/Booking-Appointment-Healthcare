import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/appointment.model';
import { DialogAppointmentComponent } from '../../dialog-appointment/dialog-appointment.component';
import { HistoryService } from 'src/app/services/history.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-confirmed-item',
  templateUrl: './confirmed-item.component.html',
  styleUrls: ['./confirmed-item.component.scss']
})
export class ConfirmedItemComponent {
  @Input() appointment: Appointment | undefined;
  @Output() deleteAppointment: EventEmitter<string> = new EventEmitter<string>();

  isConfirmed: boolean = true;

  constructor(
    private historyService: HistoryService,
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
    this.isConfirmed = !this.isConfirmed
    if (this.appointment) {
      const { phone, _id, gender, birthday, status, ...otherData } = this.appointment;

      this.historyService.postHistory(otherData).subscribe(newHistory => {
        this.removeAppointment()
        this.appointmentService.appointments = this.appointmentService.appointments.filter(item => item._id !== this.appointment?._id)
      })

   

    }
  }

  removeAppointment() {
    this.deleteAppointment.emit(this.appointment?._id);
   
  }
}
