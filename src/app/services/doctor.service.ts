import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private api: ApiService) { }

  getAllDoctor() {
    return this.api.get('doctors');
  }

  getDoctor(doctorId: string) {
    return this.api.get(`doctors/${doctorId}`);
  }
}
