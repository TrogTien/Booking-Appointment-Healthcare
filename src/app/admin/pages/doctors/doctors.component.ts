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
  doctors$: Observable<Doctor[]> | undefined;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.initState();
    this.doctors$ = this.doctorService.doctors$;
  }

  onDeleteDoctor(doctorId: string) {
    this.doctorService.deleteDoctor(doctorId).subscribe(() => {
      this.doctorService.doctors = this.doctorService.doctors.filter(_doctor => _doctor._id !== doctorId) //Next()
    });
  }

  trackByFn(index: number, doctor: Doctor) {
    return doctor._id;
  }

}
