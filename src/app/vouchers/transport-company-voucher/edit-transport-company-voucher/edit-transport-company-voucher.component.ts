import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DropdownDto, TransportCompanyServiceProxy, TransportCompanyVoucherServiceProxy, UpdateTransportCompanyVoucherDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-transport-company-voucher",
  templateUrl: "./edit-transport-company-voucher.component.html",
})
export class EditTransportCompanyVoucherComponent extends AppComponentBase {
  saving = false;
  transportCompanyVoucher = new UpdateTransportCompanyVoucherDto();
  id: number;
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
    this.initialTransportCompanyVoucher();
    this.initialTransportCompanies();
  }

  initialTransportCompanyVoucher() {
    this._transportCompanyVoucherService
      .getForEdit(this.id)
      .subscribe((result: UpdateTransportCompanyVoucherDto) => {
        this.transportCompanyVoucher = result;
      });
  }

  initialTransportCompanies() {
    this._transportCompanyService.getForDropdown().subscribe((result) => {
      this.transportCompanies = result;
    });
  }

  save(): void {
    this.saving = true;
    this._transportCompanyVoucherService
      .update(this.transportCompanyVoucher)
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
