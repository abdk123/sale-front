import { Component, Injector, Input, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'daily-production-doughnut',
  templateUrl: './daily-production-doughnut.component.html',
  styleUrls: ['./daily-production-doughnut.component.scss']
})
export class DailyProductionDoughnutComponent extends AppComponentBase implements OnInit {

  @Input() canProduce: number;
  @Input() totalProduction: number;

  //doughnutChartData: any;
  chartDataConfig: ChartService;

  constructor(injector: Injector,
    private chartService: ChartService) {
    super(injector);
    this.chartDataConfig = this.chartService;
  }
  ngOnInit(): void {
    //this.doughnutChartData = initialChartData();
  }

  initialChartData() {
    const remaining = this.canProduce - this.totalProduction;
    return {
      labels: [this.l('Produced'), this.l('Remaining')],
      datasets: [
        {
          label: '',
          borderColor: [Colors.getColors().themeColor2, Colors.getColors().themeColor3],
          backgroundColor: [
            Colors.getColors().themeColor2_10,
            Colors.getColors().themeColor3_10
          ],
          borderWidth: 2,
          data: [this.totalProduction, remaining]
        }
      ]
    }
  }
}
