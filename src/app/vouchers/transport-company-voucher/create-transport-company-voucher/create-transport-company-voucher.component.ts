import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransportCompanyVoucherDto, DropdownDto, TransportCompanyServiceProxy, TransportCompanyVoucherServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "create-transport-company-voucher",
  templateUrl: "./create-transport-company-voucher.component.html",
})
export class CreateTransportCompanyVoucherComponent extends AppComponentBase {
  saving = false;
  transportCompanyVoucher = new CreateTransportCompanyVoucherDto();
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
    private _transportCompanyVoucherService: TransportCompanyVoucherServiceProxy,
    private _transportCompanyService: TransportCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialNumber();
    this.initialTransportCompanies();
  }

  initialNumber() {
    this._transportCompanyVoucherService.getIdentityNumber()
    .subscribe((number)=>{
      this.transportCompanyVoucher.voucherNumber = number.toString();
    })
  }

  initialTransportCompanies() {
    this._transportCompanyService.getForDropdown()
    .subscribe((result)=>{
      this.transportCompanies = result;
    });
  }

  save(): void {
    this.saving = true;
    this._transportCompanyVoucherService
      .create(this.transportCompanyVoucher)
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
