import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  StockHistoryDto,
  StockHistoryServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "material-balance",
  templateUrl: "./material-balance.component.html",
  styleUrls: ["./material-balance.component.scss"],
})
export class MaterialBalanceComponent
  extends AppComponentBase
  implements OnInit
{
  balances: StockHistoryDto[] = [];
  materialId: number;
  totalQuantity: number;
  materialName: string = '';
  stockInfo: string = '';
  stockType = [
    this.l("Entry"), 
    this.l("Exit"), 
    this.l("TransferToDamaged")
  ];
  stockReason = [
    this.l("InitialBalance"),
    this.l("Receiving"),
    this.l("Delivery"),
    this.l("ReturnedToSuppleir"),
    this.l("ReturnedFromCustomer"),
    this.l("DamagedMaterial"),
  ];
  title = '';
  constructor(
    injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private stockHistoryServiceProxy: StockHistoryServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.materialId = this.route.snapshot?.params?.materialId;
    this.materialName = this.route.snapshot?.params?.materialName;
    this.totalQuantity = this.route.snapshot?.params?.totalQuantity;
    this.stockInfo = this.route.snapshot?.params?.stockInfo;
    
    this.stockHistoryServiceProxy
      .getByMaterialId(this.materialId)
      .subscribe((result) => {
        this.balances = result;
      });
  }

  navigateToTotalMaterial() {
    this.router.navigate(["/app/reports/materials-balances"]);
  }
}
