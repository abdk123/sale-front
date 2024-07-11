import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { DailyProductionDto, FilterDto, FullPagedRequestDto, DailyProductionServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterActuallyDialogComponent } from './filter-actually/filter-actually-dialog.component';
import { CreateActuallyDialogComponent } from './create-actually/create-actually-dialog.component';
import { EditActuallyDialogComponent } from './edit-actually/edit-actually-dialog.component';
@Component({
  selector: 'actually',
  templateUrl: './actually.component.html',
})

export class ActuallyComponent  extends FullPagedListingComponentBase<DailyProductionDto>  {
  data: DailyProductionDto[] = [];
  loadDetails: boolean = false;
  fields = [
    { label: this.l('Plan'), type: 'reference',referenceTextField: 'title',name: 'plan', sortable: true },
    { label: this.l('outputRequest'), type: 'reference',referenceTextField: 'title',name: 'outputRequest', sortable: true },
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _dailyProductionService: DailyProductionServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
    
  }

  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.including="Plan,outputRequest"
    this._dailyProductionService.read(request)
      .subscribe(result => {
        this.data = result.items;
        this.showPaging(result, pageNumber);
      })
  }

  showAddNewModal() {
    let createActuallyDialog: BsModalRef;
    createActuallyDialog = this._modalService.show(
      CreateActuallyDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
      }
    );
    createActuallyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any){
    let editActuallyDialog: BsModalRef;
    editActuallyDialog = this._modalService.show(
      EditActuallyDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }

      }
    );
    editActuallyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showFilterDialog(status) {
   
    if (status == 'clear_filter') {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterActuallyDialogComponent,
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

  showViewModal(id:number){

    // this._modalService.show(
    //   ViewActuallyDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       id: id,
    //     },
    //   }
    // );

  }

  deleteItem(id:number): void {
      abp.message.confirm(
        this.l('ActuallyDeleteWarningMessage',  'Actuallys'),
        undefined,
        (result: boolean) => {
          if (result) {
            this._dailyProductionService.delete(id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.refresh();
            });
          }
        }
      );
  }

}




