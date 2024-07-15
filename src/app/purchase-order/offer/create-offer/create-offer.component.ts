import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateOfferDto,
  CreateOfferItemDto,
  CustomerServiceProxy,
  DropdownDto,
} from "@shared/service-proxies/service-proxies";
import { result } from "lodash-es";

@Component({
  selector: "create-offer",
  templateUrl: "./create-offer.component.html",
  styleUrls: ["./create-offer.component.scss"],
})
export class CreateOfferComponent extends AppComponentBase implements OnInit {
  offer: CreateOfferDto = new CreateOfferDto();
  saving = false;
  customerIsRequired = false;
  currencyIsRequired = false;
  statusIsRequired = false;
  customers: DropdownDto[] = [];
  itemIndex: number;
  currencies = [
    { id: 0, name: this.l("Dollar") },
    { id: 1, name: this.l("Dinar") },
  ];
  status = [
    { id: 0, name: this.l("WaitingApproved") },
    { id: 1, name: this.l("Approved") },
  ];
  constructor(
    injector: Injector,
    private customerService: CustomerServiceProxy
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialCustomers();
  }

  initialCustomers() {
    this.customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
    });
  }

  save() {
    this.customerIsRequired = this.offer.customerId ? false : true;
    this.statusIsRequired = this.offer.status ? false : true;
    this.currencyIsRequired = this.offer.currency ? false : true;
    if(!this.customerIsRequired && !this.statusIsRequired && this.currencyIsRequired){
      if(!this.offer.offerItems){
        
      }
    }
  }

  onSaveOfferItem(items:CreateOfferItemDto[]) {
    this.offer.offerItems = items;
  }
}
