import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/model/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
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
export class AppointmentsComponent implements OnInit {
  appointments$: Observable<Appointment[]> | undefined;

  constructor(
    private appointmentService: AppointmentService,
    ) {}

  ngOnInit(): void {
    this.appointmentService.geAllAppointments();
    this.appointments$ = this.appointmentService.appointments$

    
    
  }

  trackByFn(index: number, appointment: Appointment) {
    return appointment._id;
  }

 

  

}
