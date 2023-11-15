import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setLocalStorage(res.body._id, res.headers.get('x-access-token')!, res.headers.get('x-refresh-token')!)
        console.log('Login Successful')
        console.log(res)
      })
    )
  }

  logout() {
    this.clearLocalStorage();
  }

  private setLocalStorage(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId)
    localStorage.setItem('x-access-token', accessToken)
    localStorage.setItem('x-refresh-token', refreshToken)
  }

  private clearLocalStorage() {
    localStorage.clear()
  }
}
