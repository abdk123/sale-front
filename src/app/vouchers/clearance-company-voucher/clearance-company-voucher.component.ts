import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { ClearanceCompanyVoucherDto, ClearanceCompanyVoucherServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateClearanceCompanyVoucherComponent } from './create-clearance-company-voucher/create-clearance-company-voucher.component';
import { EditClearanceCompanyVoucherComponent } from './edit-clearance-company-voucher/edit-clearance-company-voucher.component';
import { ViewClearanceCompanyVoucherComponent } from './view-clearance-company-voucher/view-clearance-company-voucher.component';

@Component({
  selector: "clearance-company-voucher",
  templateUrl: "./clearance-company-voucher.component.html",
})
export class ClearanceCompanyVoucherComponent
  extends FullPagedListingComponentBase<ClearanceCompanyVoucherDto>
  implements OnInit
{
  clearanceCompanyVouchers: ClearanceCompanyVoucherDto[] = [];

  voucherTypes = [
    {
      value: 0,
      text: this.l("Spend"),
    },
    {
      value: 1,
      text: this.l("Receive"),
    },
  ];

  currencies = [
    {
      value: 0,
      text: this.l("Dinar"),
    },
    {
      value: 1,
      text: this.l("Dollar"),
    },
  ];

  fields = [
    {
      label: this.l("VoucherType"),
      name: "voucherType",
      sortable: true,
      type: "enum",
      enumValue: this.voucherTypes,
    },
    {
      label: this.l("Currency"),
      name: "currency",
      sortable: true,
      type: "enum",
      enumValue: this.currencies,
    },
    {
      label: this.l("Amount"),
      name: "amount",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("VoucherNumber"),
      name: "voucherNumber",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("VoucherDate"),
      name: "voucherDate",
      sortable: true,
      type: "date",
    },
    {
      label: this.l("ClearanceCompany"),
      name: "clearanceCompany",
      sortable: false,
      type: "reference",
      referenceTextField: "name",
    },
  ];
  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _clearanceCompanyVoucherService: ClearanceCompanyVoucherServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "clearanceCompany";
    this._clearanceCompanyVoucherService.read(request).subscribe((result) => {
      this.clearanceCompanyVouchers = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createClearanceCompanyVoucher: BsModalRef;
    createClearanceCompanyVoucher = this._modalService.show(
      CreateClearanceCompanyVoucherComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
      }
    );
    createClearanceCompanyVoucher.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editClearanceCompanyVoucher: BsModalRef;
    editClearanceCompanyVoucher = this._modalService.show(
      EditClearanceCompanyVoucherComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
        initialState: {
          id: id,
        },
      }
    );
    editClearanceCompanyVoucher.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l(
        "ClearanceCompanyVoucherDeleteWarningMessage",
        "ClearanceCompanyVouchers"
      ),
      undefined,
      (result: boolean) => {
        if (result) {
          this._clearanceCompanyVoucherService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewClearanceCompanyVoucherComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    });
  }

  showFilterDialog(status) {
    // if (status == "clear_filter") {
    //   this.request.filtering = undefined;
    //   this.refresh();
    //   return;
    // }
    // let filterDialog: BsModalRef;
    // filterDialog = this._modalService.show(FilterClearanceCompanyVoucherComponent, {
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    //   initialState: {
    //     filterInput: this.request.filtering,
    //   },
    //   class: "modal-lg",
    // });
    // filterDialog.content.onSave.subscribe((result: FilterDto) => {
    //   this.request.filtering = result;
    //   this._modalService.hide();
    //   this.refresh();
    // });
  }
}
