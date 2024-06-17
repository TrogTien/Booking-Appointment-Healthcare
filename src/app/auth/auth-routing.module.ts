import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../guards/auth.guard';
import { loginGuard } from '../guards/login.guard';
import { adminGuard } from '../guards/admin.guard';

import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';



const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'login', component: LoginComponent,
      },
      { 
        path: 'signup', component: SignUpComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
