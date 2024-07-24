import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { TransportCompanyVoucherDto, TransportCompanyVoucherServiceProxy, FullPagedRequestDto, FilterDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateTransportCompanyVoucherComponent } from './create-transport-company-voucher/create-transport-company-voucher.component';
import { EditTransportCompanyVoucherComponent } from './edit-transport-company-voucher/edit-transport-company-voucher.component';
import { ViewTransportCompanyVoucherComponent } from './view-transport-company-voucher/view-transport-company-voucher.component';

@Component({
  selector: "transport-company-voucher",
  templateUrl: "./transport-company-voucher.component.html",
})
export class TransportCompanyVoucherComponent
  extends FullPagedListingComponentBase<TransportCompanyVoucherDto>
  implements OnInit
{
  transportCompanyVouchers: TransportCompanyVoucherDto[] = [];

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
      format:"yyyy-MM-dd"
    },
    {
      label: this.l("TransportCompany"),
      name: "transportCompany",
      sortable: false,
      type: "reference",
      referenceTextField: "name",
    },
  ];
  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _transportCompanyVoucherService: TransportCompanyVoucherServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "transportCompany";
    this._transportCompanyVoucherService.read(request).subscribe((result) => {
      this.transportCompanyVouchers = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createTransportCompanyVoucher: BsModalRef;
    createTransportCompanyVoucher = this._modalService.show(
      CreateTransportCompanyVoucherComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
      }
    );
    createTransportCompanyVoucher.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editTransportCompanyVoucher: BsModalRef;
    editTransportCompanyVoucher = this._modalService.show(
      EditTransportCompanyVoucherComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
        initialState: {
          id: id,
        },
      }
    );
    editTransportCompanyVoucher.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l(
        "TransportCompanyVoucherDeleteWarningMessage",
        "TransportCompanyVouchers"
      ),
      undefined,
      (result: boolean) => {
        if (result) {
          this._transportCompanyVoucherService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewTransportCompanyVoucherComponent, {
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
    // filterDialog = this._modalService.show(FilterTransportCompanyVoucherComponent, {
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

