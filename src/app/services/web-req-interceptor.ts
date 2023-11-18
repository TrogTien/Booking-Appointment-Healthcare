import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  refreshingAccessToken: boolean = false;


  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle request
    request = this.addAuthHeader(request);

    // call next() and handle the response

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {


        if (err.status === 401 && !this.refreshingAccessToken ) {
          // 401 are unauthorized
          console.log('Test')
          // refresh the accessToken
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request);

              return next.handle(request);

            }),
            catchError(err => {
              console.log('Test1')

              this.refreshingAccessToken = false;

              this.authService.logout()
              return of({});
            })
          )
        }

        return throwError(() => err);

      })
    )
  }

  refreshAccessToken(): Observable<any> {
    if (!this.refreshingAccessToken) {
      this.refreshingAccessToken = true;

    }
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false;
        console.log("Access Token Refreshed")
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken();
    console.log('addHeader: ',token)
    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }

    return request;
  }


}
