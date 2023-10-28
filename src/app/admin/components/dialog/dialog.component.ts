import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalField } from 'src/app/model/medical_field.model';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  medicalId: string = '';

  constructor(
    private builder: FormBuilder,
    private medicalService: MedicalFieldService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: MedicalField

  ) {}

  ngOnInit(): void {
    if(this.editData) {
      this.medicalId = this.editData._id;
      this.medicalForm.controls['name'].setValue(this.editData.name);
      this.medicalForm.controls['description'].setValue(this.editData.description);
    
    }
  }
  
  medicalForm = this.builder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  onSubmit() {
    if (this.editData) {
      this.updateMedical()
    } else {
      this.addMedical()
    }
  }

  addMedical() {
    if (this.medicalForm.valid) {
      this.medicalService.addMedical(this.medicalForm.value)
      this.dialogRef.close()
    } else {
      alert('Invalid');
    }
  }

  updateMedical() {
    if (this.medicalForm.valid) {
      const data = {
        ... this.medicalForm.value,
        _id: this.medicalId
      }
      
      this.medicalService.updateMedical(this.editData._id, data)
      this.dialogRef.close()
    } else {
      alert('Invalid')
    }
  }
}
