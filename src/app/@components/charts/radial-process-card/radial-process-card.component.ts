import { Component, Input, OnInit } from '@angular/core';
import { PlanProductDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-radial-process-card',
  templateUrl: './radial-process-card.component.html',
})
export class RadialProcessCardComponent implements OnInit{

  @Input() title = 'title';
  @Input() percent = 0;
  @Input() isSortable = false;
  @Input() class = '';
  @Input() canProduce : number;
  @Input() totalProduction : number;


  constructor() { }
  ngOnInit(): void {
    if(this.canProduce > 0){
      this.percent = Math.round((this.totalProduction * 100) / this.canProduce);
    }
    
  }



}
