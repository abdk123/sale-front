import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { CustomerVoucherDto, CustomerVoucherServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateCustomerVoucherComponent } from './create-customer-voucher/create-customer-voucher.component';
import { EditCustomerVoucherComponent } from './edit-customer-voucher/edit-customer-voucher.component';
import { ViewCustomerVoucherComponent } from './view-customer-voucher/view-customer-voucher.component';

@Component({
  selector: "customer-voucher",
  templateUrl: "./customer-voucher.component.html",
})
export class CustomerVoucherComponent
  extends FullPagedListingComponentBase<CustomerVoucherDto>
  implements OnInit
{
  customerVouchers: CustomerVoucherDto[] = [];

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
      label: this.l("Discount"),
      name: "discount",
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
      label: this.l("Customer"),
      name: "customer",
      sortable: false,
      type: "reference",
      referenceTextField: "name",
    },
  ];
  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _customerVoucherService: CustomerVoucherServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "customer";
    this._customerVoucherService.read(request).subscribe((result) => {
      this.customerVouchers = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createCustomerVoucher: BsModalRef;
    createCustomerVoucher = this._modalService.show(
      CreateCustomerVoucherComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
      }
    );
    createCustomerVoucher.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editCustomerVoucher: BsModalRef;
    editCustomerVoucher = this._modalService.show(
      EditCustomerVoucherComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
        initialState: {
          id: id,
        },
      }
    );
    editCustomerVoucher.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l(
        "CustomerVoucherDeleteWarningMessage",
        "CustomerVouchers"
      ),
      undefined,
      (result: boolean) => {
        if (result) {
          this._customerVoucherService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewCustomerVoucherComponent, {
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
    // filterDialog = this._modalService.show(FilterCustomerVoucherComponent, {
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


