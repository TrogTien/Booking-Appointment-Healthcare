import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();


  constructor(
    private api: ApiService,
    private router: Router,
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  set isLoggedIn(val: boolean) {
    this._isLoggedIn.next(val);
  }

  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setLocalStorage(res.body._id, res.headers.get('x-access-token')!, res.headers.get('x-refresh-token')!)
        console.log('Login Successful')
        this.isLoggedIn = true; //Next()
        // this.loginService.isLoggedIn = true;
      })
    )
  }

  register(data: Object) {
    return this.api.register(data).pipe(
      shareReplay(), // Prevent calling webService.login multi
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setLocalStorage(res.body._id, res.headers.get('x-access-token')!, res.headers.get('x-refresh-token')!)
        console.log('Register Successful');
        this.isLoggedIn = true;
        // this.loginService.isLoggedIn = true;


      })
    )
  }

  logout() {
    this.clearLocalStorage();
    this.isLoggedIn = false;
    // this.loginService.isLoggedIn = false;


  }

  checkLogin() {
    return this.api.get('auth/checkLogin')
  }
  

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }
  
  getNewAccessToken() {
    return this.http.post(
      `${this.api.ROOT_URL}/auth/accessToken`, 
      {},
      {
        headers: {
          'x-refresh-token': this.getRefreshToken()!,
          'user-id': this.getUserId()!
        },
        observe: 'response'
      }).pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token')!);
      })
    )
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
