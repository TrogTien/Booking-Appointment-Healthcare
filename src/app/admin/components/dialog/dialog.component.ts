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
  imageUrl: string = '';
  imageFile: File | undefined;

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
    
      if (this.editData.image) {
        this.imageUrl = "http://localhost:3000/" + this.editData.image;
      }
    }
  }
  
  medicalForm = this.builder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  })

  onSubmit() {
    if (this.editData) {
      this.updateMedical();
      this.onSubmitImage();
    } else {
      this.addMedical()
    }
  }

  onSubmitImage() {

    if (this.imageFile) {
      const formData = new FormData();
      formData.append("image", this.imageFile);
      formData.append("medicalId", this.medicalId);
  
      this.medicalService.uploadImage(formData).subscribe((res) => {
        console.log(res)
      })

    } else {
      console.log("No file selected")
    }

  }

  addMedical() {
    if (this.medicalForm.valid && this.imageFile) {
      const formData = new FormData();
      formData.append("name", this.medicalForm.controls.name.value!);
      formData.append("description", this.medicalForm.controls.description.value!);
      formData.append("image", this.imageFile);
      this.medicalService.addMedical(formData)
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

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
    const allowedTypeImage = ["image/png", "image/jpeg", "image/jpg"];

    if (this.imageFile && allowedTypeImage.includes(this.imageFile.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    } else {
      console.log("File không hợp lệ")
    }
  }

}
