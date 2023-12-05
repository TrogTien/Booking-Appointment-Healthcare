import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  
  private readonly _appointments = new BehaviorSubject<Appointment[]>([]);

  appointments$ = this._appointments.asObservable()

  // confirmedAppointments$ = this.appointments$.pipe(
  //   map(datas => datas.filter(data => data.status === "đã xác nhận"))
  // )

  // unConfirmedAppointments$ = this.appointments$.pipe(
  //   map(datas => datas.filter(data => data.status === "chưa xác nhận"))
  // )

  constructor(private api: ApiService) { }
  
  get appointments(): Appointment[] {
    return this._appointments.getValue()
  }

  set appointments(val: Appointment[]) {
    this._appointments.next(val);
  }

  
  
  getAllAppointments(): void {
    this.api.get('appointments').subscribe(data => {
      this.appointments = data;
    });
  }

  postAppointment(data: object) {
    return this.api.post('appointments', data);
  }

  patchAppointment(id: string, data: Object) {
    return this.api.patch(`appointments/${id}`,  data);
  }

  deleteAppointment(id: string) {
    return this.api.delete(`appointments/${id}`);
  }
}
