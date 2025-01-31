import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateCustomerVoucherDto, DropdownDto, CustomerVoucherServiceProxy, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "create-customer-voucher",
  templateUrl: "./create-customer-voucher.component.html",
})
export class CreateCustomerVoucherComponent extends AppComponentBase {
  saving = false;
  customerVoucher = new CreateCustomerVoucherDto();
  @Output() onSave = new EventEmitter<any>();
  transportCompanies: DropdownDto[] = [];
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
    private _customerVoucherService: CustomerVoucherServiceProxy,
    private _customerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialNumber();
    this.initialCustomer();
  }
  initialNumber() {
    this._customerVoucherService.getIdentityNumber()
    .subscribe((number)=>{
      this.customerVoucher.voucherNumber = number.toString();
    })
  }

  initialCustomer() {
    this._customerService.getForDropdown().subscribe((result) => {
      this.transportCompanies = result;
    });
  }

  save(): void {
    this.saving = true;
    this._customerVoucherService
      .create(this.customerVoucher)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        response;
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}

