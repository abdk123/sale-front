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
  offer: CreateSupplierOfferDto = new CreateSupplierOfferDto();
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
    private offerService: SupplierOfferServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialCustomers();
    this.offer.status = 0;
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
      this.offer.porchaseOrderId = '';
    }
  }

  save() {
    
    this.customerIsRequired = this.offer.supplierId ? false : true;
    this.statusIsRequired = this.offer.status == undefined ? true : false;
    this.currencyIsRequired = this.offer.currency == undefined ? true : false;
    if(!this.customerIsRequired && !this.statusIsRequired && !this.currencyIsRequired){
      if(!this.offer.supplierOfferItems){
        abp.message.warn(this.l('PleaseAddAtLeastOneMaterial'));
      }
      if(!this.offer.porchaseOrderId && this.offer.status == 1){
        abp.message.warn(this.l('PoNumberIsRequired'));
      }
      this.saving = true;
    this.offerService
      .create(this.offer)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notify.info(this.l("SavedSuccessfully"));
          this.router.navigate(['/app/orders/supplier-offers']);
        })
      )
      .subscribe((result) => {
        
      });
    }
  }

  onSaveOfferItem(items:CreateSupplierOfferItemDto[]) {
    this.offer.supplierOfferItems = items;
  }

  onSelectCustomer(args){
    this.customerCashFlowService.getBalance(this.offer.supplierId)
    .subscribe((result: BalanceInfoDto)=>{
      this.customerBalance = result;
    })
  }
}

