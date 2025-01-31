import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateClearanceCompanyVoucherDto, DropdownDto, ClearanceCompanyVoucherServiceProxy, ClearanceCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-clearance-company-voucher',
  templateUrl: './create-clearance-company-voucher.component.html',
})
export class CreateClearanceCompanyVoucherComponent  extends AppComponentBase {
  saving = false;
  clearanceCompanyVoucher = new CreateClearanceCompanyVoucherDto();
  @Output() onSave = new EventEmitter<any>();
  clearanceCompanies: DropdownDto[] = [];
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
    private _clearanceCompanyVoucherService: ClearanceCompanyVoucherServiceProxy,
    private _clearanceCompanyService: ClearanceCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialNumber();
    this.initialClearanceCompanies();
  }

  initialNumber() {
    this._clearanceCompanyVoucherService.getIdentityNumber()
    .subscribe((number)=>{
      this.clearanceCompanyVoucher.voucherNumber = number.toString();
    })
  }
  
  initialClearanceCompanies() {
    this._clearanceCompanyService.getForDropdown()
    .subscribe((result)=>{
      this.clearanceCompanies = result;
    });
  }

  save(): void {
    this.saving = true;
    this._clearanceCompanyVoucherService
      .create(this.clearanceCompanyVoucher)
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