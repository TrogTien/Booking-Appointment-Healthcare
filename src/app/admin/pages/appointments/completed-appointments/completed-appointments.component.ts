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
      
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ]),
  ]
})
export class CompletedAppointmentsComponent implements OnInit {
  histories: History[] = [];

  // Pagination
  page: number = 1;
  total: number = 0;
  limit: number = 2;

  constructor(
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.getHistories();
  }

  getHistories() {
    this.historyService.getAllHistories(this.page, this.limit).subscribe(res => {
      this.histories = res.histories;
      this.total = res.total;
      this.limit = res.limit;
    })
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getHistories();

  }

  trackByFn(index: number, history: History) {
    return history._id;
  }
}
