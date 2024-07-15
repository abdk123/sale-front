import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UpdateClearanceCompanyVoucherDto, DropdownDto, ClearanceCompanyVoucherServiceProxy, ClearanceCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-clearance-company-voucher",
  templateUrl: "./edit-clearance-company-voucher.component.html",
})
export class EditClearanceCompanyVoucherComponent extends AppComponentBase {
  saving = false;
  clearanceCompanyVoucher = new UpdateClearanceCompanyVoucherDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();
  clearanceCompanies: DropdownDto[] = [];
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
    private _clearanceCompanyVoucherService: ClearanceCompanyVoucherServiceProxy,
    private _clearanceCompanyService: ClearanceCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialClearanceCompanyVoucher();
    this.initialClearanceCompanies();
  }

  initialClearanceCompanyVoucher() {
    this._clearanceCompanyVoucherService
      .getForEdit(this.id)
      .subscribe((result: UpdateClearanceCompanyVoucherDto) => {
        this.clearanceCompanyVoucher = result;

        this.voucherDate = new DatePipe("en-US").transform(
          this.clearanceCompanyVoucher.voucherDate,
          "yyyy-MM-dd"
        );
      });
  }

  initialClearanceCompanies() {
    this._clearanceCompanyService.getForDropdown().subscribe((result) => {
      this.clearanceCompanies = result;
    });
  }

  save(): void {
    this.saving = true;
    this.clearanceCompanyVoucher.voucherDate = this.voucherDate;
    this._clearanceCompanyVoucherService
      .update(this.clearanceCompanyVoucher)
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