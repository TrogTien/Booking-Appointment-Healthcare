import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();



  constructor() { }

  get isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  set isLoggedIn(val: boolean) {
    this._isLoggedIn.next(val);
  }
}
