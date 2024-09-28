import { Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CommaNumberPipe } from '@shared/pipes/comma-number.pipe';
import { BalanceInfoDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'balance-info',
  templateUrl: './balance-info.component.html',
  styleUrls: ['./balance-info.component.scss']
})
export class BalanceInfoComponent extends AppComponentBase implements OnChanges {
  @Input() balance: BalanceInfoDto = new BalanceInfoDto();
  dinar: string = '';
  dollar: string = '';
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.balance){
      const comma = new CommaNumberPipe();
      this.dinar = `${comma.transform(Math.abs(this.balance.dinarBalance))} ${ this.balance.dinarBalance > 0 ? 'له' : 'عليه' }`;
      this.dollar = `${comma.transform(Math.abs(this.balance.dollarBalance))} ${ this.balance.dollarBalance > 0 ? 'له' : 'عليه' }`;
    }
  }
}
