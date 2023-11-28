import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { History } from 'src/app/model/history.model';
import { DialogAppointmentComponent } from '../../dialog-appointment/dialog-appointment.component';

@Component({
  selector: 'app-completed-item',
  templateUrl: './completed-item.component.html',
  styleUrls: ['./completed-item.component.scss']
})
export class CompletedItemComponent {
  @Input() history: History | undefined;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
    
  }

  openDialog() {
    this.dialog.open(DialogAppointmentComponent, {
      width: '50%',
      data: this.history
    });
  }

}
