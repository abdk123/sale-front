import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  BalanceInfoDto,
  TransportCompanyCashFlowServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "total-transport-cash-flow",
  templateUrl: "./total-transport-cash-flow.component.html",
  styleUrls: ["./total-transport-cash-flow.component.scss"],
})
export class TotalTransportCashFlowComponent
  extends AppComponentBase
  implements OnInit
{
  balances: BalanceInfoDto[] = [];
  forHimDollarBalance = 0;
  onHimDollarBalance = 0;
  forHimDinarBalance = 0;
  onHimDinarBalance = 0;
  constructor(
    injector: Injector,
    private router: Router,
    private transportCashFlowService: TransportCompanyCashFlowServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.transportCashFlowService
      .getAllBalances()
      .subscribe((result) => {
        this.balances = result;
        this.forHimDollarBalance = this.balances.filter(x=>x.dollarBalance >= 0)
          .reduce((sum, current) => sum + current.dollarBalance, 0);

          this.onHimDollarBalance = this.balances.filter(x=>x.dollarBalance < 0)
          .reduce((sum, current) => sum + current.dollarBalance, 0);

          this.forHimDinarBalance = this.balances.filter(x=>x.dollarBalance >= 0)
          .reduce((sum, current) => sum + current.dinarBalance, 0);

          this.onHimDinarBalance = this.balances.filter(x=>x.dollarBalance < 0)
          .reduce((sum, current) => sum + current.dinarBalance, 0);
        
      });
  }

  showDetails(id:number){
    this.router.navigate([
      "/app/cash-flows/transport-company-cash-flows",
      {
        id: id,
      },
    ]);
  }
}
