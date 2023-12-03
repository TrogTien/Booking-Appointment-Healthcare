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

  patchHourDoctor(doctorId: string, data: any) {
    return this.api.patch(`doctors/addHour/${doctorId}`, data);
  }

  removeHourDoctor(doctorId: string, data: any) {
    return this.api.patch(`doctors/deleteHour/${doctorId}`, data);
  }

  getAllDoctor(query?: string ): Observable<any> {
    if (!query) {
      return this.api.get(`doctors`);

    }
    return this.api.get(`doctors?search=${query}`);
  }

  getDoctorByUserId(userId: string): Observable<Doctor> {
    return this.api.get(`doctors/by-user/${userId}`);
  }

  getDoctor(doctorId: string): Observable<Doctor> {
    return this.api.get(`doctors/${doctorId}`);
  }

  getDoctorMedical(medicalId: string): Observable<any> {
    return this.api.get(`doctors/medical/${medicalId}`)
  }

  patchDoctor(doctorId: string, data: any) {
    return this.api.patch(`doctors/${doctorId}`, data);
  }
 
  deleteDoctor(doctorId: string) {
    return this.api.delete(`doctors/${doctorId}`);
  }
  // this.api.post("upload", formData).subscribe((res) => {
  //   console.log(res)
  // })

  uploadImage(formData: FormData) {
    return this.api.post("doctors/upload", formData);
  }
}
