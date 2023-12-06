import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService)

  


  return authService.isLoggedIn$.pipe(
    map(val => {
      return (val || !!localStorage.getItem("x-access-token"))
    }),
    tap(val => {
      console.log("auth guards: ", val)
      if (!val) {
        console.log("Guard Deny");
        toast.warning({ detail: "Cảnh báo", summary: "Bạn cần phải đăng nhập", duration: 2000 })
        router.navigate(['/login']);
      }
      
    })
  )

  
};


