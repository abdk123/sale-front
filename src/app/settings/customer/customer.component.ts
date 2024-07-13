import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateCustomerDialogComponent } from './create-customer/create-customer-dialog.component';
import { EditCustomerDialogComponent } from './edit-customer/edit-customer-dialog.component';
import { ViewCustomerDialogComponent } from './view-customer/view-customer-dialog.component';
import {FilterDto, FullPagedRequestDto, CustomerDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterCustomerDialogComponent } from './filter-customer/filter-customer-dialog.component';

@Component({
  selector: "customer",
  templateUrl: "./customer.component.html",
})
export class CustomerComponent
  extends FullPagedListingComponentBase<CustomerDto>
  implements OnInit
{
  customers: CustomerDto[] = [];
  typeValues = [
    {
      value: 0,
      text: this.l("Customer")
    },
    {
      value: 1,
      text: this.l("Supplier")
    },
    {
      value: 2,
      text: this.l("CustomerAndSupplier")
    },
  ]


  fields = [
    {
      label: this.l("FullName"),
      name: "fullName",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("PhoneNumber"),
      name: "phoneNumber",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("Address"),
      name: "address",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("BalanceInDollar"),
      name: "balanceInDollar",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("BalanceInDinar"),
      name: "balanceInDinar",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("InitialBalance"),
      name: "initialBalance",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("Type"),
      name: "type",
      sortable: false,
      type: "enum",
      enumValue: this.typeValues,
    },
  ];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _customerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._customerService.read(request).subscribe((result) => {
      debugger;
      this.customers = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createCustomerDialog: BsModalRef;
    createCustomerDialog = this._modalService.show(
      CreateCustomerDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: "modal-lg",
      }
    );
    createCustomerDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any) {
    let editCustomerDialog: BsModalRef;
    editCustomerDialog = this._modalService.show(EditCustomerDialogComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });
    editCustomerDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("CustomerDeleteWarningMessage", "Customers"),
      undefined,
      (result: boolean) => {
        if (result) {
          this._customerService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewCustomerDialogComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    });
  }

  showFilterDialog(status) {
    if (status == "clear_filter") {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(FilterCustomerDialogComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        filterInput: this.request.filtering,
      },
      class: "modal-lg",
    });
    filterDialog.content.onSave.subscribe((result: FilterDto) => {
      this.request.filtering = result;
      this._modalService.hide();
      this.refresh();
    });
  }
}




