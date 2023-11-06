import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { MedicalField } from '../model/medical_field.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalFieldService {

  private readonly _medicals = new BehaviorSubject<MedicalField[]>([]);

  medicals$ = this._medicals.asObservable();

  constructor(private api: ApiService) { }

  get medicals(): MedicalField[] {
    return this._medicals.getValue();
  }

  set medicals(val: MedicalField[]) {
    this._medicals.next(val);
  }

  getAllMedical() {
    this.api.get('medical_fields').subscribe(data => {
      this.medicals = data
    })
  }

  addMedical(data: any) {
    this.api.post('medical_fields', data).subscribe((_data: MedicalField) => {
      this.medicals.push(_data);
    })
  }

  removeMedical(id: string) {
    this.api.delete(`medical_fields/${id}`).subscribe(() => {
      const index = this.medicals.findIndex(item => item._id == id);
      this.medicals.splice(index, 1);
    })
  }

  updateMedical(id: string, data: any) {
    this.api.patch(`medical_fields/${id}`, data).subscribe(() => {
      const index = this.medicals.findIndex(item => item._id == id);
      this.medicals.splice(index, 1, data);
    })
  }
}
