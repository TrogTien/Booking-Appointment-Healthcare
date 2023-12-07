import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;
  role$: Observable<string> | undefined; 

  constructor(
    public authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.role$ = this.roleService.role$;
    this.isLoggedIn$ = this.authService.isLoggedIn$
  }

  onLogout() {
    this.authService.logout();
    this.roleService.setRole();
    this.router.navigate(['/login'])
  }
}
