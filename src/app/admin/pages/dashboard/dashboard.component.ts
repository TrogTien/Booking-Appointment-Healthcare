import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { Chart } from 'angular-highcharts';
import { HistoryService } from 'src/app/services/history.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role$: Observable<string> | undefined; 
  selectedMonth: Date = new Date();  // Tháng được chọn

  data: number[] = [];
  categories: string[] = [];

  year: number = 2020;


  chart = new Chart();



  constructor(
    private roleService: RoleService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.role$ = this.roleService.role$;
    this.historyService.getAllPatientByAdmin().subscribe((data: any[]) => {
      var i = 1;
      this.year = data[0]._id.year;

      
      data.forEach(item => {
        while (i !== item._id.month) {

          this.data.push(0);
          this.categories.push('Tháng ' + i);
          i = i + 1
        }

        this.data.push(item.count);
        this.categories.push('Tháng ' + item._id.month);
        i = i + 1;
      });

      this.drawChart()
    })
  }

  drawChart() {

    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: `Biểu đồ số lượng bệnh nhân năm ${this.year}`
      },
      credits: {
        enabled: false
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: "Số lượng người khám"
        }
      },
      xAxis: {  // Cấu hình trục x
        categories: this.categories // Đổi tên nhãn tại đây
      },
      series: [
        {
          name: 'Số lượng người khám',
          data: this.data,
        } as any
      ]
    });
  }

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

  onMonthChange(): void {
  }
 
}
