import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestDoctor } from 'src/app/model/requestDoctor.model';

@Component({
  selector: 'app-dialog-request',
  templateUrl: './dialog-request.component.html',
  styleUrls: ['./dialog-request.component.scss']
})
export class DialogRequestComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RequestDoctor,

  ) {}

}
