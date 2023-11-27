import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Appointment } from 'src/app/model/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-confirmed-appointments',
  templateUrl: './confirmed-appointments.component.html',
  styleUrls: ['./confirmed-appointments.component.scss'],
  animations: [
    trigger('hideAndShow', [
      transition(':leave', [
        animate(300, style({opacity: 0, height: 0}))
      ]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ]),
  ]
})
export class ConfirmedAppointmentsComponent implements OnInit {
  appointments$: Observable<Appointment[]> | undefined;

  constructor(
    private appointmentService: AppointmentService,
    
  ) {}

  ngOnInit(): void {
    this.appointmentService.geAllAppointments();
    this.appointments$ = this.appointmentService.appointments$.pipe(
      map(items => {
          return items.filter(item => {
            return item.status === 'đã xác nhận'
          })
        }
      )
    );
  }

  trackByFn(index: number, appointment: Appointment) {
    return appointment._id;
  }

  onDeleteAppointment(appointmentId: string) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(() => {
     
      this.appointmentService.appointments = this.appointmentService.appointments.filter(item => item._id !== appointmentId);
    })
  }
}
