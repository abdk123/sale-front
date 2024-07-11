import { Component } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';

@Component({
  selector: 'plan-products-percentage',
  templateUrl: './plan-products-percentage.component.html',
  styleUrls: ['./plan-products-percentage.component.scss']
})
export class PlanProductsPercentageComponent {
  chartDataConfig: ChartService;
  doughnutChartData = {
    labels: ['Men Shampoo', 'Oil Replacement'],
    datasets: [
      {
        label: '',
        borderColor: [Colors.getColors().themeColor3, Colors.getColors().themeColor2, Colors.getColors().themeColor1],
        backgroundColor: [
          Colors.getColors().themeColor3_10,
          Colors.getColors().themeColor2_10,
          // Colors.getColors().themeColor1_10
        ],
        borderWidth: 2,
        data: [15, 25]
      }
    ]
  };
  constructor(private chartService: ChartService) {
    this.chartDataConfig = this.chartService;
  }

}
