import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { UnitDto, UnitServiceProxy, FilterDto, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterUnitDialogComponent } from './filter-unit/filter-unit-dialog.component';
import { CreateUnitDialogComponent } from './create-unit/create-unit-dialog.component';
import { EditUnitDialogComponent } from './edit-unit/edit-unit-dialog.component';
import { ViewUnitDialogComponent } from './view-unit/view-unit-dialog.component';

@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
})
export class UnitComponent extends FullPagedListingComponentBase<UnitDto> implements OnInit {
  units: UnitDto[] = [];
  fields = [
    { label: this.l('Name'), name: 'name', sortable: true, type: 'string' },
  ];
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }
  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._unitService.read(request)
      .subscribe(result => {
        this.units = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  showAddNewModal() {
    let createUnitDialog: BsModalRef;
    createUnitDialog = this._modalService.show(
      CreateUnitDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
      }
    );
    createUnitDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any){
    let editUnitDialog: BsModalRef;
    editUnitDialog = this._modalService.show(
      EditUnitDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }
      }
    );
    editUnitDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id:number): void {
    abp.message.confirm(
      this.l('UnitDeleteWarningMessage',  'Units'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._unitService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
}

showViewModal(id:number){
  this._modalService.show(
    ViewUnitDialogComponent,
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
      FilterUnitDialogComponent,
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




