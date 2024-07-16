import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UpdateCustomerVoucherDto, DropdownDto, CustomerVoucherServiceProxy, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-customer-voucher",
  templateUrl: "./edit-customer-voucher.component.html",
})
export class EditCustomerVoucherComponent extends AppComponentBase {
  saving = false;
  customerVoucher = new UpdateCustomerVoucherDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();
  customers: DropdownDto[] = [];
  voucherDate: string;

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
    this.initialCustomerVoucher();
    this.initialTransportCompanies();
  }

  initialCustomerVoucher() {
    this._customerVoucherService
      .getForEdit(this.id)
      .subscribe((result: UpdateCustomerVoucherDto) => {
        this.customerVoucher = result;

        this.voucherDate = new DatePipe("en-US").transform(
          this.customerVoucher.voucherDate,
          "yyyy-MM-dd"
        );
      });
  }

  initialTransportCompanies() {
    this._customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
    });
  }

  save(): void {
    this.saving = true;
    this.customerVoucher.voucherDate = this.voucherDate;
    this._customerVoucherService
      .update(this.customerVoucher)
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
