import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/model/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
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
export class DoctorsComponent implements OnInit {
  doctors: Doctor[]  = [];

  // Pagination
  page: number = 1;
  total: number = 0;
  limit: number = 2;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctorDocuments()
  }

  getDoctorDocuments() {
    this.doctorService.getAllDoctorDocuments(this.page, this.limit).subscribe(res => {
      console.log(res)
      this.doctors = res.doctors;
      this.total = res.total;
      this.limit = res.limit;
    })
  }

  onDeleteDoctor(doctorId: string) {
    this.doctorService.deleteDoctor(doctorId).subscribe(() => {
      this.doctors = this.doctors.filter(_doctor => _doctor._id !== doctorId) //Next()
    });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.getDoctorDocuments()
  }

  trackByFn(index: number, doctor: Doctor) {
    return doctor._id + doctor.image;
  }

}
