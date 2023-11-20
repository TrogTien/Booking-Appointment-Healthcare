import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bookingcare';

  constructor(
    private authService: AuthService,
    private roleService: RoleService
  
  ) {
    
  }

  ngOnInit(): void {
    this.authService.checkLogin().subscribe(() => {
      console.log("isLoggedIn");
      this.authService.isLoggedIn = true;
      this.roleService.setRole()
    })


  }
}
