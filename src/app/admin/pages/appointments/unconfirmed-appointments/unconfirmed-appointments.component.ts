import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Appointment } from 'src/app/model/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-unconfirmed-appointments',
  templateUrl: './unconfirmed-appointments.component.html',
  styleUrls: ['./unconfirmed-appointments.component.scss'],
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
export class UnconfirmedAppointmentsComponent implements OnInit {
  appointments$: Observable<Appointment[]> | undefined;

  constructor(
    private appointmentService: AppointmentService,

  ) {}

  ngOnInit(): void {
    this.appointmentService.getAllAppointments();
    this.appointments$ = this.appointmentService.appointments$.pipe(
      map(items => {
          return items.filter(item => {
            return item.status === 'chưa xác nhận'
          })
        }
      )
    );
  }

  trackByFn(index: number, appointment: Appointment) {
    return appointment._id;
  }

  onDeleteAppointment(appointmentId: string) {
    this.appointmentService.appointments = this.appointmentService.appointments.filter(item => item._id !== appointmentId);

    this.appointmentService.deleteAppointment(appointmentId).subscribe(() => {
     
    })
  }

}
