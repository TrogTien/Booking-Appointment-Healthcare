import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { Doctor } from 'src/app/model/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  animations: [
    trigger('hideAndShow', [
      
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({opacity: 1}))
      ])
    ]),
  ]
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  role$: Observable<string> | undefined; 
  searchTerm: string ='';

  // Pagination
  page: number = 1;
  total: number = 0;
  limit: number = 4;

  private searchTerm$ = new Subject<string>()

  constructor(
    private doctorService: DoctorService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.getDoctors();

    this.role$ = this.roleService.role$

    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        return this.doctorService.getAllDoctor(term, this.page, this.limit)
      })
    ).subscribe(response => {
      this.doctors = response.doctors;
      this.total = response.total;
      this.limit = response.limit;
    })
  }

  getDoctors(query?: string) {
    query = query || '';

    this.doctorService.getAllDoctor(query, this.page, this.limit).subscribe( res => {
      this.doctors = res.doctors;
      this.total = res.total;
      this.limit = res.limit;
    })
  }

  onSearch() {
    console.log(this.searchTerm)
    this.searchTerm$.next(this.searchTerm);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    if (!this.searchTerm) {
      this.getDoctors();
    } else {
      this.getDoctors(this.searchTerm);
    }
  }

  trackByFn(index: number, doctor: Doctor) {
    return doctor._id;
  }
  

}
