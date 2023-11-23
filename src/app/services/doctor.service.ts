import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Doctor } from '../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private readonly _doctors = new BehaviorSubject<Doctor[]>([]);

  doctors$: Observable<Doctor[]> = this._doctors.asObservable();

  constructor(private api: ApiService) { }

  get doctors(): Doctor[] {
    return this._doctors.getValue();
  }

  set doctors(val: Doctor[]) {
    this._doctors.next(val);
  }

  initState(): void {
    this.getAllDoctor().subscribe(_doctors => {
      this.doctors = _doctors
    })
  }

  postDoctor(data: any) {
    return this.api.post('doctors', data);
  }

  getAllDoctor(query?: string ): Observable<any> {
    if (!query) {
      return this.api.get(`doctors`);

    }
    return this.api.get(`doctors?search=${query}`);
  }

  getDoctor(doctorId: string): Observable<Doctor> {
    return this.api.get(`doctors/${doctorId}`);
  }

  getDoctorMedical(query: string): Observable<any> {
    return this.api.get(`doctors/medical?medical=${query}`)
  }
 
  deleteDoctor(doctorId: string) {
    return this.api.delete(`doctors/${doctorId}`);
  }
}
