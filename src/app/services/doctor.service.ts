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
    this.getAllDoctorDocuments().subscribe(res => {
      this.doctors = res.doctors
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

  getAllDoctor(query?: string, page?: number, limit?: number ): Observable<any> { //isActive: true
    query = query || '';
    page = page || 1;
    limit = limit || 8;
   
    return this.api.get(`doctors?search=${query}&page=${page}&limit=${limit}`);
  }

  getAllDoctorDocuments(page?: number, limit?: number) {  
    page = page || 1;
    limit = limit || 8;

    return this.api.get(`doctors/allDocuments?page=${page}&limit=${limit}`)
  }

  getDoctorByUserId(userId: string): Observable<Doctor> {
    return this.api.get(`doctors/by-user/${userId}`);
  }

  getDoctor(doctorId: string): Observable<Doctor> {
    return this.api.get(`doctors/${doctorId}`);
  }

  getDoctorMedical(medicalId: string, page?: number, limit?: number): Observable<any> {
    page = page || 1;
    limit = limit || 8;

    return this.api.get(`doctors/medical/${medicalId}?page=${page}&limit=${limit}`)
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
