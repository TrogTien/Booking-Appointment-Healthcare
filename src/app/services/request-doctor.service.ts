import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RequestDoctorService {

  constructor(
    private api: ApiService
  ) { }

  getAllRequestDoctor() {
    return this.api.get('requestDoctor');
  }

  postRequestDoctor(data: any) {
    return this.api.post('requestDoctor', data);
  }

  deleteRequestDoctor(requestId: string) {
    return this.api.delete(`requestDoctor/${requestId}`);
  }


  // postAppointment(data: object) {
  //   return this.api.post('appointments', data);
  // }
}
