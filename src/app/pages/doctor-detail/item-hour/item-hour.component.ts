import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-item-hour',
  templateUrl: './item-hour.component.html',
  styleUrls: ['./item-hour.component.scss']
})
export class ItemHourComponent implements OnInit {
  @Input() hourItem: string = '';
  @Input() doctorId: string = '';
  @Input() dayItem: Date | undefined;

  isDisabled: boolean = false;

  constructor(
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentService.checkIsConfirmedAppointment(this.doctorId, this.dayItem!, this.hourItem).subscribe({
      next: (req) => {
        console.log("Nothing")
      },
      error: (err: HttpResponse<any>) => {
        if (err.status === 400) {
          this.isDisabled = true;
        }
      }
    })
  }

 
  
}
