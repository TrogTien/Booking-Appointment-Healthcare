import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RequestDoctor } from 'src/app/model/requestDoctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { RequestDoctorService } from 'src/app/services/request-doctor.service';

@Component({
  selector: 'app-request-doctor',
  templateUrl: './request-doctor.component.html',
  styleUrls: ['./request-doctor.component.scss'],
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
export class RequestDoctorComponent implements OnInit {
  requestDoctors: RequestDoctor[] = [];

  constructor(
    private requestDoctorService: RequestDoctorService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.requestDoctorService.getAllRequestDoctor().subscribe(_requestDoctors => {
      this.requestDoctors = _requestDoctors;
    })
  }

  onDeleteRequest(requestId: string) {
    this.requestDoctorService.deleteRequestDoctor(requestId).subscribe(() => {
      this.requestDoctors = this.requestDoctors.filter(request => request._id !== requestId);
    })
  }

  onCreateDoctor(requestDoctor: RequestDoctor) {
    this.requestDoctors = this.requestDoctors.filter(request => request._id !== requestDoctor._id);

    const data = {
      name: requestDoctor.doctorName,
      address: requestDoctor.address,
      userId: requestDoctor.userId
    }
    this.doctorService.postDoctor(data).subscribe(data => {
      console.log("Tao Bac si thanh cong");
      
    })
  }

  trackByFn(index: number, request: RequestDoctor) {
    return request._id;
  }

}
