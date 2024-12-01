import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  MaterialBalanceDto,
  StockHistoryServiceProxy,
  
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "total-material-balance",
  templateUrl: "./total-material-balance.component.html",
  styleUrls: ["./total-material-balance.component.scss"],
})
export class TotalMaterialBalanceComponent
  extends AppComponentBase
  implements OnInit
{
  balances: MaterialBalanceDto[] = [];
  totalBalance: number;
  totalPrice: number;
  constructor(
    injector: Injector,
    private router: Router,
    private stockHistoryServiceProxy: StockHistoryServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.stockHistoryServiceProxy.getMaterialBalance()
      .subscribe((result) => {
        this.balances = result;
        this.totalBalance = this.balances.reduce((sum, current) => sum + current.totalQuantity, 0);
        this.totalPrice = this.balances.reduce((sum, current) => sum + current.price, 0);
      });
  }

  navigateToDetails(item: MaterialBalanceDto){
    this.router.navigate([
      "/app/reports/material-balance",
      {
        materialId: item.materialId,
        materialName: item.name,
        stockInfo: item.stockInfo,
        totalQuantity: item.totalQuantity
      },
    ]);
  }
}
