import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto, CustomerServiceProxy, CustomerVoucherDto, CustomerVoucherServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "view-customer-voucher",
  templateUrl: "./view-customer-voucher.component.html",
})
export class ViewCustomerVoucherComponent
  extends AppComponentBase
  implements OnInit
{
  data = new CustomerVoucherDto();
  customer = new CustomerDto();
  id: number;
  editable: true;

  types = [
    {
      id: 0,
      name: this.l("Spend"),
    },
    {
      id: 1,
      name: this.l("Receive"),
    },
  ];

  currencies = [
    {
      id: 0,
      name: this.l("Dinar"),
    },
    {
      id: 1,
      name: this.l("Dollar"),
    },
  ];

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _customerVoucherService: CustomerVoucherServiceProxy,
    private _customerService: CustomerServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCustomerVoucher();
  }

  initCustomerVoucher() {
    this._customerVoucherService.get(this.id).subscribe((response) => {
      this.data = response;
      this.initialCustomer(this.data.customerId);
      this.initialType(response.voucherType);
      this.initialCurrency(response.currency);
    });
  }

  initialCustomer(customerId: number) {
    this._customerService.get(customerId).subscribe((result) => {
      this.customer = result;
    });
  }
  type: string;
  currency: string;
  initialType(id) {
    this.type = this.types.find((x) => x.id == id).name;
  }

  initialCurrency(id) {
    this.currency = this.currencies.find((x) => x.id == id).name;
  }
}

