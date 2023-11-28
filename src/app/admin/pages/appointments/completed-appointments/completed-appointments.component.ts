import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/model/history.model';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-completed-appointments',
  templateUrl: './completed-appointments.component.html',
  styleUrls: ['./completed-appointments.component.scss'],
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
export class CompletedAppointmentsComponent implements OnInit {
  histories: History[] = [];

  constructor(
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.historyService.getAllHistories().subscribe(_histories => {
      this.histories = _histories;
    })
  }

  trackByFn(index: number, history: History) {
    return history._id;
  }
}
