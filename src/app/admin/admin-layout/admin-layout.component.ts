import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  role$: Observable<string> | undefined; 

  constructor(
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.role$ = this.roleService.role$;
  }
}
