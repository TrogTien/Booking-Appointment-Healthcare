import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalField } from 'src/app/model/medical_field.model';
import { NgToastService } from 'ng-angular-popup';


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
    private toast: NgToastService,

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
      this.medicalService.addMedical(formData).subscribe({
        next: (data) => {
          this.medicalService.medicals.push(data);
          this.showSuccess()
          this.dialogRef.close();
        },
        error: (err) => {
          this.showError(err.error);
        }
      })
    } else {
      this.showError("Invalid")
    }
  }

  updateMedical() {
    if (this.medicalForm.valid) {
      const formData = new FormData();
      formData.append("name", this.medicalForm.controls.name.value!);
      formData.append("description", this.medicalForm.controls.description.value!);
      formData.append("_id", this.medicalId);

      if (this.imageFile) {
        formData.append("image", this.imageFile);
        
      }

      
      this.medicalService.updateMedical(this.editData._id, formData)
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

  showSuccess() {
    this.toast.success({ detail: "Thành công", summary: "Chuyên khoa đã được tạo", duration: 2000})
  }

  showError(msg: string) {
    this.toast.error({ detail: "Lỗi", summary: msg, duration: 2000})
  }

}
