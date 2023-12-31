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
    console.log("val: ",val);
    this._availableTimes.next(val);
  }

  fetchDayTime(val: AvailableTime[]): void {
    this.availableTimes = val;
    this.filterAvailableTime = val;
  }

  changeDay(day: any ): void {
    this.availableTimes = this.filterAvailableTime.filter( times => times.day === day)

    // console.log(this.filterAvailableTime.filter( times => times.day === day))
    // Lọc mảng hours theo day
  }

  addHour(day: any, hour: string) {
    const indexTime = this.filterAvailableTime.findIndex(time => time.day === day);
    if (indexTime !== -1) {
      this.filterAvailableTime[indexTime].hours.push(hour);
    } else {
      const newTime: AvailableTime = {
        day: day,
        hours: [hour]
      };

      this.filterAvailableTime.push(newTime);
    }

    this.availableTimes = this.filterAvailableTime.filter( times => times.day === day);
  }

  removeHour(day: any, hour: string) {
    const indexTime = this.filterAvailableTime.findIndex(time => time.day === day);
    if (indexTime !== -1) {
      const availableTime = this.filterAvailableTime[indexTime];

      if (availableTime.hours.length === 1) {
        this.filterAvailableTime = this.filterAvailableTime.filter( time => time.day !== day)
      } else if (availableTime.hours.length > 1) {
        
        const indexHour = availableTime.hours.findIndex(_hour => _hour === hour);
        availableTime.hours.splice(indexHour, 1);
      }
    }

    this.availableTimes = this.filterAvailableTime.filter(times => times.day === day)
  }

  
}
