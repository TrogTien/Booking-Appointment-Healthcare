import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/model/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],

})
export class AppointmentsComponent implements OnInit {

  navLinks: any[] = [];
  activeLinkIndex = -1; 

  constructor(
    private router: Router
  ) {
    this.navLinks = [
      {
          label: 'Chưa Xác Nhận',
          link: './unconfirmed',
          index: 0
      }, {
          label: 'Đã Xác Nhận',
          link: './confirmed',
          index: 1
      }, {
          label: 'Đã Khám',
          link: './completed',
          index: 2
      }, 
    ];
  }

  ngOnInit(): void {
   
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

  
  }

}
