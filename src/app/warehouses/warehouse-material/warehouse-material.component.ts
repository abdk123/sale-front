import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWarehouseMaterialDialogComponent } from './create-warehouse-material/create-warehouse-material-dialog.component';
import { EditWarehouseMaterialDialogComponent } from './edit-warehouse-material/edit-warehouse-material-dialog.component';
import { ViewWarehouseMaterialDialogComponent } from './view-warehouse-material/view-warehouse-material-dialog.component';
import { FilterDto, FullPagedRequestDto, WarehouseMaterialDto, WarehouseMaterialServiceProxy } from '@shared/service-proxies/service-proxies';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterWarehouseMaterialDialogComponent } from './filter-warehouse-material/filter-warehouse-material-dialog.component';
import { IEnumValue } from '@app/layout/content-template/page-default/page-field';

@Component({
  selector: 'warehousematerial',
  templateUrl: './warehouse-material.component.html',

})
export class WarehouseMaterialComponent extends FullPagedListingComponentBase<WarehouseMaterialDto> implements OnInit {
  warehousematerials: WarehouseMaterialDto[] = [];
  status:IEnumValue[]=[
    {value:0,text:this.l("NotExpired")},
    {value:1,text:this.l("AlmostToExpired")},
    {value:2,text:this.l("Expired")},
  ];

  fields = [
    { label: this.l('Material'), name: 'material', sortable: true, type: 'reference' ,referenceTextField: 'name'},
    { label: this.l('Warehouse'), name: 'warehouse', sortable: true, type: 'reference' ,referenceTextField: 'name'},
    { label: this.l('EntryDate'), name: 'entryDate', sortable: true, type: 'date' },
    { label: this.l('ExpirationDate'), name: 'expirationDate', sortable: true, type: 'date' },
    { label: this.l('InitialQuantity'), name: 'initialQuantity', sortable: true, type: 'number' },
    { label: this.l('CurrentQuantity'), name: 'currentQuantity', sortable: true, type: 'number' },


  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _warehousematerialService: WarehouseMaterialServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.request.including = "Material,Warehouse,";
    this._warehousematerialService.read(request)
      .subscribe(result => {
        console.log(result.items)
        this.warehousematerials = result.items;

        this.showPaging(result, pageNumber);
      })

  }

  showAddNewModal() {
    let createWarehouseMaterialDialog: BsModalRef;
    createWarehouseMaterialDialog = this._modalService.show(
      CreateWarehouseMaterialDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createWarehouseMaterialDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editWarehouseMaterialDialog: BsModalRef;
    editWarehouseMaterialDialog = this._modalService.show(
      EditWarehouseMaterialDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }

      }
    );
    editWarehouseMaterialDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  deleteItem(id:number): void {


    abp.message.confirm(
      this.l('WarehouseMaterialDeleteWarningMessage',  'WarehouseMaterials'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._warehousematerialService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );

}
showViewModal(id:number){

  this._modalService.show(
    ViewWarehouseMaterialDialogComponent,
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
      FilterWarehouseMaterialDialogComponent,
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




