import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestDoctor } from 'src/app/model/requestDoctor.model';
import { DialogRequestComponent } from '../dialog-request/dialog-request.component';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss']
})
export class RequestItemComponent {
  @Input() requestDoctor: RequestDoctor | undefined;
  @Output() deleteRequest: EventEmitter<string> = new EventEmitter<string>();
  @Output() conformRequest: EventEmitter<RequestDoctor> = new EventEmitter<RequestDoctor>();


  constructor(
    private dialog: MatDialog
  ) {}


  openDialog() {
    this.dialog.open(DialogRequestComponent, {
      width: '50%',
      data: this.requestDoctor
    });
  }

  removeDoctor() {
    this.deleteRequest.emit(this.requestDoctor?._id);
  }

  confirm() {
    this.conformRequest.emit(this.requestDoctor);
  }


  

}
