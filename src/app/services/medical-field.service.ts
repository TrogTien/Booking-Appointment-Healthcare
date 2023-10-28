import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { MedicalField } from '../model/medical_field.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalFieldService {

  private readonly _medical = new BehaviorSubject<MedicalField[]>([]);

  medical$ = this._medical.asObservable();

  constructor(private api: ApiService) { }

  get medical(): MedicalField[] {
    return this._medical.getValue();
  }

  set medical(val: MedicalField[]) {
    this._medical.next(val);
  }

  getAllMedical() {
    this.api.get('medical_fields').subscribe(data => {
      this.medical = data
    })
  }

  addMedical(data: any) {
    this.api.post('medical_fields', data).subscribe((_data: MedicalField) => {
      this.medical.push(_data);
    })
  }

  removeMedical(id: string) {
    this.api.delete(`medical_fields/${id}`).subscribe(() => {
      const index = this.medical.findIndex(item => item._id == id);
      this.medical.splice(index, 1);
    })
  }

  updateMedical(id: string, data: any) {
    this.api.patch(`medical_fields/${id}`, data).subscribe(() => {
      const index = this.medical.findIndex(item => item._id == id);
      this.medical.splice(index, 1, data);
    })
  }
}
