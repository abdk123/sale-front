import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  BalanceInfoDto,
  CreateSupplierOfferDto,
  CreateSupplierOfferItemDto,
  CustomerCashFlowServiceProxy,
  CustomerServiceProxy,
  DropdownDto,
  SupplierOfferServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { result } from "lodash-es";
import { finalize } from "rxjs";

@Component({
  selector: "create-supplier-offer",
  templateUrl: "./create-supplier-offer.component.html",
  styleUrls: ["./create-supplier-offer.component.scss"],
})
export class CreateSupplierOfferComponent extends AppComponentBase implements OnInit {
  supplierOffer: CreateSupplierOfferDto = new CreateSupplierOfferDto();
  saving = false;
  customerIsRequired = false;
  currencyIsRequired = false;
  statusIsRequired = false;
  showPorchaseOrder = false;
  customers: DropdownDto[] = [];
  itemIndex: number;
  customerBalance : BalanceInfoDto = new BalanceInfoDto();
  currencies = [
    { id: 1, name: this.l("Dollar") },
    { id: 0, name: this.l("Dinar") },
  ];
  status = [
    { id: 0, name: this.l("WaitingApprove") },
    { id: 1, name: this.l("Approved") },
  ];
  constructor(
    injector: Injector,
    private router: Router,
    private customerService: CustomerServiceProxy,
    private customerCashFlowService: CustomerCashFlowServiceProxy,
    private supplierOfferService: SupplierOfferServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialCustomers();
    this.supplierOffer.status = 0;
  }

  initialCustomers() {
    this.customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
    });
  }

  onChangeStatus(status){
    if(status?.id == 1){
      this.showPorchaseOrder = true;
    }else{
      this.showPorchaseOrder = false;
      this.supplierOffer.porchaseOrderId = '';
    }
  }

  save() {
    this.customerIsRequired = this.supplierOffer.supplierId ? false : true;
    this.statusIsRequired = this.supplierOffer.status == undefined ? true : false;
    this.currencyIsRequired = this.supplierOffer.currency == undefined ? true : false;
    if(!this.customerIsRequired && !this.statusIsRequired && !this.currencyIsRequired){
      if(!this.supplierOffer.supplierOfferItems){
        abp.message.warn(this.l('PleaseAddAtLeastOneMaterial'));
      }
      if(!this.supplierOffer.porchaseOrderId && this.supplierOffer.status == 1){
        abp.message.warn(this.l('PoNumberIsRequired'));
      }
      this.saving = true;
    this.supplierOfferService
      .create(this.supplierOffer)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notify.info(this.l("SavedSuccessfully"));
        })
      )
      .subscribe((result) => {
        this.router.navigate(['/app/orders/supplier-offers']);
      });
    }
  }

  onSaveOfferItem(items:CreateSupplierOfferItemDto[]) {
    this.supplierOffer.supplierOfferItems = items;
  }

  onSelectSupplier(args){
    this.customerCashFlowService.getBalance(this.supplierOffer.supplierId)
    .subscribe((result: BalanceInfoDto)=>{
      this.customerBalance = result;
    })
  }
}
