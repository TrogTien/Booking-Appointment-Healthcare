import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from '../services/role.service';
import { map, tap } from 'rxjs';


export const adminGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService);
  const router = inject(Router)

  const expectedRole = route.data['expectedRole'];


  return roleService.role$.pipe(
    map(role => {
      if (role === expectedRole) {
        return true;
      }
      return false;
    }),
    tap(val => {
      if (!val) {
        console.log("Admin Guard Deny");
        router.navigate(['/home'])
      }
    })
  );
};
