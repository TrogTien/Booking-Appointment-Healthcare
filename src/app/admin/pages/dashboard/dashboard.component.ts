import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role$: Observable<string> | undefined; 

  constructor(
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.role$ = this.roleService.role$;
  }


}
