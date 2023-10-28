import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly ROOT_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${endpoint}`);
  }

  post(endpoint: string, data: Object): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${endpoint}`, data);
  }

  patch(endpoint: string, data: Object): Observable<any> {
    return this.http.patch(`${this.ROOT_URL}/${endpoint}`, data);
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.ROOT_URL}/${endpoint}`);
  }


}
