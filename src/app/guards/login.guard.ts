import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("login guard: ", !authService.isLoggedIn)

  if (authService.isLoggedIn || !!localStorage.getItem("x-access-token")) {
    console.log("Guards Login Deny");
    router.navigate(['/home']);

    return false
  }

  

  return true
};
