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

  getAllDoctor(): Observable<Doctor[]> {
    return this.api.get('doctors');
  }

  getDoctor(doctorId: string): Observable<Doctor> {
    return this.api.get(`doctors/${doctorId}`);
  }

  deleteDoctor(doctorId: string) {
    return this.api.delete(`doctors/${doctorId}`);
  }
}
