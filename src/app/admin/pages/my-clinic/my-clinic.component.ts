import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-clinic',
  templateUrl: './my-clinic.component.html',
  styleUrls: ['./my-clinic.component.scss']
})
export class MyClinicComponent implements OnInit {
  weekDays: Date[] | undefined;
  selectedDate = 0;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`;

  ngOnInit(): void {
    this.weekDays = this.getWeekDaysFromNow();
  }

  getWeekDaysFromNow(): Date[] {
    const weekDays = [];
    for (let i = 0 ; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      weekDays.push(date);
    }

    return weekDays;
  }



}
