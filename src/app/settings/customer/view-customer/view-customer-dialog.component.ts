import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "view-customer-dialog",
  templateUrl: "./view-customer-dialog.component.html",
})
export class ViewCustomerDialogComponent
  extends AppComponentBase
  implements OnInit
{
  data = new CustomerDto();
  id: number;
  editable: true;
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _customerService: CustomerServiceProxy
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initCustomer();
  }

  initCustomer() {
    this._customerService.get(this.id).subscribe((response: CustomerDto) => {
      this.data = response;
    });
  }
}
