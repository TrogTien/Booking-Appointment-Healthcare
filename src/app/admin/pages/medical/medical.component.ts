import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalField } from 'src/app/model/medical_field.model';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';


@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
  medicals$: Observable<MedicalField[]> | undefined;

  constructor(
    private medicalService: MedicalFieldService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.medicalService.getAllMedical();
    this.medicals$ = this.medicalService.medical$
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }

  onDeleteMedical(medicalId: string) {
    this.medicalService.removeMedical(medicalId);
  }

  openDialogData(medical: MedicalField) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: medical
    })
  }



}
