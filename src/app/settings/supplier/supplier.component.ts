import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateSupplierDialogComponent } from './create-supplier/create-supplier-dialog.component';
import { EditSupplierDialogComponent } from './edit-supplier/edit-supplier-dialog.component';
import { ViewSupplierDialogComponent } from './view-supplier/view-supplier-dialog.component';
import {FilterDto, FullPagedRequestDto, SupplierDto, SupplierServiceProxy } from '@shared/service-proxies/service-proxies';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterSupplierDialogComponent } from './filter-supplier/filter-supplier-dialog.component';

@Component({
  selector: 'supplier',
  templateUrl: './supplier.component.html',

})
export class SupplierComponent extends FullPagedListingComponentBase<SupplierDto> implements OnInit {
  suppliers: SupplierDto[] = [];
  fields = [
    { label: this.l('Name'), name: 'name', sortable: true, type: 'string' },
    { label: this.l('Description'), name: 'description', sortable: false, type: 'string' },


  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _supplierService: SupplierServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._supplierService.read(request)
      .subscribe(result => {
        this.suppliers = result.items;
        this.showPaging(result, pageNumber);
      })

  }

  showAddNewModal() {
    let createSupplierDialog: BsModalRef;
    createSupplierDialog = this._modalService.show(
      CreateSupplierDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createSupplierDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any) {
    let editSupplierDialog: BsModalRef;
    editSupplierDialog = this._modalService.show(
      EditSupplierDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState: {
          id: id
        }

      }
    );
    editSupplierDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  deleteItem(id: number): void {
    abp.message.confirm(
      this.l('SupplierDeleteWarningMessage', 'Suppliers'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._supplierService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(
      ViewSupplierDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
      }
    );
  }

  showFilterDialog(status) {
    if (status == 'clear_filter') {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterSupplierDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          filterInput: this.request.filtering,
        },
        class: 'modal-lg',
      }
    );
    filterDialog.content.onSave.subscribe((result: FilterDto) => {
      this.request.filtering = result;
      this._modalService.hide();
      this.refresh();
    });
  }

}




