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

  getAllHistories(page?: number, limit?: number) {
    page = page || 1;
    limit = limit || 8;
    return this.api.get(`history?page=${page}&limit=${limit}`);
  }
}
