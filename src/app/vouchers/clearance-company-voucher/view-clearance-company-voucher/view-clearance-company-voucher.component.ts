import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ClearanceCompanyVoucherDto, ClearanceCompanyDto, ClearanceCompanyVoucherServiceProxy, ClearanceCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "view-clearance-company-voucher",
  templateUrl: "./view-clearance-company-voucher.component.html",
})
export class ViewClearanceCompanyVoucherComponent
  extends AppComponentBase
  implements OnInit
{
  data = new ClearanceCompanyVoucherDto();
  clearanceCompany = new ClearanceCompanyDto();
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
    private _clearanceCompanyVoucherService: ClearanceCompanyVoucherServiceProxy,
    private _clearanceCompanyService: ClearanceCompanyServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initClearanceCompanyVoucher();
  }

  initClearanceCompanyVoucher() {
    this._clearanceCompanyVoucherService.get(this.id).subscribe((response) => {
      this.data = response;
      this.initialClearanceCompany(this.data.clearanceCompanyId);
      this.initialType(response.voucherType);
      this.initialCurrency(response.currency);
    });
  }

  initialClearanceCompany(clearanceCompanyId: number) {
    this._clearanceCompanyService.get(clearanceCompanyId).subscribe((result) => {
      this.clearanceCompany = result;
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