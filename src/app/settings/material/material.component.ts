import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateMaterialDialogComponent } from './create-material/create-material-dialog.component';
import { EditMaterialDialogComponent } from './edit-material/edit-material-dialog.component';
import { ViewMaterialDialogComponent } from './view-material/view-material-dialog.component';
import { FilterDto, FullPagedRequestDto, MaterialDto, MaterialServiceProxy } from '@shared/service-proxies/service-proxies';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterMaterialDialogComponent } from './filter-material/filter-material-dialog.component';

@Component({
  selector: 'material',
  templateUrl: './material.component.html',

})
export class MaterialComponent extends FullPagedListingComponentBase<MaterialDto> implements OnInit {
  materials: MaterialDto[] = [];
  fields = [
    { label: this.l('Name'), name: 'name', sortable: true, type: 'string' },
    { label: this.l('Code'), name: 'code', sortable: true, type: 'string' },
    { label: this.l('Description'), name: 'description', sortable: false, type: 'string'},
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _materialService: MaterialServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._materialService.read(request)
      .subscribe(result => {
        this.materials = result.items;
        this.showPaging(result, pageNumber);
      })
  
  }

  showAddNewModal() {
    let createMaterialDialog: BsModalRef;
    createMaterialDialog = this._modalService.show(
      CreateMaterialDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createMaterialDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editMaterialDialog: BsModalRef;
    editMaterialDialog = this._modalService.show(
      EditMaterialDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }

      }
    );
    editMaterialDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  deleteItem(id:number): void {
    abp.message.confirm(
      this.l('MaterialDeleteWarningMessage',  'Materials'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._materialService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
}

showViewModal(id:number){
  this._modalService.show(
    ViewMaterialDialogComponent,
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
      FilterMaterialDialogComponent,
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




