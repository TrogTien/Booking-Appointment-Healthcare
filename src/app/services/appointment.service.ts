import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private api: ApiService) { }

  postAppointment(data: object) {
    return this.api.post('appointments', data);
  }
}
