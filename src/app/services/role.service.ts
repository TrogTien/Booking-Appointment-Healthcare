import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly _role: BehaviorSubject<string> = new BehaviorSubject<string>('');

  role$: Observable<string> = this._role.asObservable()

  helper = new JwtHelperService();

  constructor(
    private authService: AuthService
  ) { }

  get role(): string {
    return this._role.getValue();
  }

  set role(val: string) {
    this._role.next(val);
  }

  setRole() {
    if (this.authService.isLoggedIn || !!this.authService.getAccessToken()) {
      const accessToken = this.authService.getAccessToken();
      const decode = this.helper.decodeToken(accessToken!);
      this.role = decode.role;
      console.log("Set Role thanh cong")
    } else {
      console.log("Chua dang nhap")
      this.role = '';
    }

  }
}
