import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWarehouseDialogComponent } from './create-warehouse/create-warehouse-dialog.component';
import { EditWarehouseDialogComponent } from './edit-warehouse/edit-warehouse-dialog.component';
import { ViewWarehouseDialogComponent } from './view-warehouse/view-warehouse-dialog.component';
import {  FilterDto, FullPagedRequestDto, WarehouseDto, WarehouseServiceProxy } from '@shared/service-proxies/service-proxies'
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterWarehouseDialogComponent } from './filter-warehouse/filter-warehouse-dialog.component';

@Component({
  selector: 'warehouse',
  templateUrl: './warehouse.component.html',

})
export class WarehouseComponent extends FullPagedListingComponentBase<WarehouseDto> implements OnInit {
  warehouses: WarehouseDto[] = [];
  fields = [
    { label: this.l('Name'), name: 'name', sortable: true, type: 'string' },
    { label: this.l('Storekeeper'), name: 'warehouseKeeper', sortable: true, type: 'reference',referenceTextField: 'name' },
    { label: this.l('Place'), name: 'place', sortable: true, type: 'string' },
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _warehouseService: WarehouseServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.request.including = "To,From,WarehouseKeeper";
    this._warehouseService.read(request)
      .subscribe(result => {
        console.log(result.items)
        this.warehouses = result.items;

        this.showPaging(result, pageNumber);
      })

  }

  showAddNewModal() {
    let createWarehouseDialog: BsModalRef;
    createWarehouseDialog = this._modalService.show(
      CreateWarehouseDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createWarehouseDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editWarehouseDialog: BsModalRef;
    editWarehouseDialog = this._modalService.show(
      EditWarehouseDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }

      }
    );
    editWarehouseDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  deleteItem(id:number): void {


    abp.message.confirm(
      this.l('WarehouseDeleteWarningMessage',  'Warehouses'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._warehouseService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );

}
showViewModal(id:number){

  this._modalService.show(
    ViewWarehouseDialogComponent,
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
      FilterWarehouseDialogComponent,
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




