import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalField } from 'src/app/model/medical_field.model';
import { MedicalFieldService } from 'src/app/services/medical-field.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss'],
  animations: [
    trigger('hideAndShow', [
      transition(':leave', [
        animate(300, style({opacity: 0, height: 0}))
      ]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ]),
    
  ]
})
export class MedicalComponent implements OnInit {
  medicals$: Observable<MedicalField[]> | undefined;

  constructor(
    private medicalService: MedicalFieldService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.medicalService.initState();
    this.medicals$ = this.medicalService.medicals$
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    });
  }

  onDeleteMedical(medicalId: string) {
    this.medicalService.removeMedical(medicalId);
  }

  openDialogData(medical: MedicalField) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: medical
    })
  }

  trackByFn(index: number, medical: MedicalField) {
    return medical._id;
  }


}
