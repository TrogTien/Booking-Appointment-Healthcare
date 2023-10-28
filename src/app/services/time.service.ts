import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvailableTime } from '../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class TimeService {


  private readonly _availableTimes = new BehaviorSubject<AvailableTime[]>([]);

  availableTimes$ = this._availableTimes.asObservable();

  filterAvailableTime: AvailableTime[] = [];

  constructor() { }

  get availableTimes(): AvailableTime[] {
    return this._availableTimes.getValue();
  }

  set availableTimes(val: AvailableTime[]) {
    this._availableTimes.next(val);
  }

  fetchDayTime(val: AvailableTime[]): void {
    this.availableTimes = val;
    this.filterAvailableTime = val;
  }

  changeDay(day: Date ): void {
    this.availableTimes = this.filterAvailableTime.filter( times => times.day === day)

    // console.log(this.filterAvailableTime.filter( times => times.day === day))
    // Lọc mảng hours theo day
  }

  
}
