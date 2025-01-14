import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ProfitDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-profit',
  templateUrl: './view-profit.component.html',
  styleUrls: ['./view-profit.component.scss']
})
export class ViewProfitComponent extends AppComponentBase implements OnChanges {

  @Input() profit: ProfitDto = new ProfitDto();
  constructor(injector: Injector){
    super(injector)
  }
  ngOnChanges(changes: SimpleChanges) {
    
  }

}
