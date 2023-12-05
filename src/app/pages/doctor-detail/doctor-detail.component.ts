import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { AvailableTime, Doctor } from 'src/app/model/doctor.model';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {
  doctor$: Observable<Doctor> | undefined;
  availableTimes$: Observable<AvailableTime[]> | undefined;
  selected = 0;

  imageUrl: string = '';

  sortTime: AvailableTime[] = [];

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(
    private doctorService: DoctorService,
    private _route: ActivatedRoute,
    private timeService: TimeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctor$ = this._route.paramMap.pipe(
      map((params) => params.get('doctorId')),
      switchMap((doctorId) => this.doctorService.getDoctor(doctorId!))
    )

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0,0);
      }
    })

    this.passDataToTimeService();

    this.availableTimes$ = this.timeService.availableTimes$;
    
  }

  passDataToTimeService(): void {
    this.doctor$?.subscribe( doctor => {
      if (doctor.image) {
        this.imageUrl = "http://localhost:3000/" + doctor.image;
      } else {
        this.imageUrl = "http://localhost:3000/uploads/avatarDoctor.jpg"
      }
      this.sortTime = this.sortAvailableTimes(doctor.availableTimes); // Sort
      this.timeService.fetchDayTime(doctor.availableTimes) ;
      console.log("OnInit: ",this.timeService.availableTimes)

    })
  }

  OnChangeDay(day: Date) {
    this.timeService.changeDay(day);
    console.log("change: ", day);
  }

  onCheckLoggedIn() {
    this.authService.checkLogin().subscribe(() => {
      console.log("Check Login")
    })
  }

  sortAvailableTimes(availableTimes: AvailableTime[]): AvailableTime[] {
    return availableTimes.sort((a, b) => {
      // Chuyển đổi ngày thành đối tượng Date
      const dateA = new Date(a.day);
      const dateB = new Date(b.day);

      // So sánh ngày và trả về kết quả tăng dần
      return dateA.getTime() - dateB.getTime();
    });
  }


}
