import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  return authService.isLoggedIn$.pipe(
    map(val => {
      return (val || !!localStorage.getItem("x-access-token"))
    }),
    tap(val => {
      console.log("auth guards: ", val)
      if (!val) {
        console.log("Guard Deny");
        alert("Bạn cần đăng nhập")
        router.navigate(['/login']);
      }
      
    })
  )

  
};
