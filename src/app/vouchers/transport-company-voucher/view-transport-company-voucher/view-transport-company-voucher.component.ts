import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { TransportCompanyVoucherDto, TransportCompanyDto, TransportCompanyVoucherServiceProxy, TransportCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "view-transport-company-voucher",
  templateUrl: "./view-transport-company-voucher.component.html",
})
export class ViewTransportCompanyVoucherComponent
  extends AppComponentBase
  implements OnInit
{
  data = new TransportCompanyVoucherDto();
  transportCompany = new TransportCompanyDto();
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
    private _transportCompanyVoucherService: TransportCompanyVoucherServiceProxy,
    private _transportCompanyService: TransportCompanyServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initTransportCompanyVoucher();
  }

  initTransportCompanyVoucher() {
    this._transportCompanyVoucherService.get(this.id).subscribe((response) => {
      this.data = response;
      this.initialTransportCompany(this.data.transportCompanyId);
      this.initialType(response.voucherType);
      this.initialCurrency(response.currency);
    });
  }

  initialTransportCompany(transportCompanyId: number) {
    this._transportCompanyService
      .get(transportCompanyId)
      .subscribe((result) => {
        this.transportCompany = result;
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