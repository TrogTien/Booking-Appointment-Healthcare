import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private api: ApiService
  ) { }

  postHistory(data: any) {
    return this.api.post('history', data);
  }

  getAllHistories() {
    return this.api.get('history');
  }
}
