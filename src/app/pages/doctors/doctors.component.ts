import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Doctor } from 'src/app/model/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  role$: Observable<string> | undefined; 
  searchTerm: string ='';

  private searchTerm$ = new Subject<string>()

  constructor(
    private doctorService: DoctorService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.doctorService.getAllDoctor().subscribe( _doctors => {
      this.doctors = _doctors;
    })

    this.role$ = this.roleService.role$

    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        return this.doctorService.getAllDoctor(term)
      })
    ).subscribe(_doctors => {
      this.doctors = _doctors;
    })
  }

  onSearch() {
    console.log(this.searchTerm)
    this.searchTerm$.next(this.searchTerm);
  }

  

}
