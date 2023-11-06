import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/model/doctor.model';

@Component({
  selector: 'app-dialog-doctor',
  templateUrl: './dialog-doctor.component.html',
  styleUrls: ['./dialog-doctor.component.scss']
})
export class DialogDoctorComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDoctor: Doctor,

  ) {}

  ngOnInit(): void {
    
  }

  
}
