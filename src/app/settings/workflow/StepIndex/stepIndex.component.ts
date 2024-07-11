import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterDto, FullPagedRequestDto, WorkflowStepIndexServiceProxy, WorkflowStepIndexDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterStepIndexDialogComponent } from './filter-step-index/filter-step-Index-dialog.component';
import { CreateStepIndexDialogComponent } from './create-step-index/create-step-Index-dialog.component';
import { EditStepIndexDialogComponent } from './edit-step-index/edit-step-Index-dialog.component';
import { ViewStepIndexDialogComponent } from './view-step-index/view-step-Index-dialog.component';

@Component({
  selector: 'step',
  templateUrl: './stepIndex.component.html',
})
export class StepIndexComponent extends FullPagedListingComponentBase<WorkflowStepIndexDto> implements OnInit {
  steps: WorkflowStepIndexDto[] = [];
  fields = [
    { label: this.l('Name'), name: 'actionName', sortable: true, type: 'string' },
    { label: this.l('Order'), name: 'order', sortable: true, type: 'number' },
  ];
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _stepService: WorkflowStepIndexServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }
  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._stepService.read(request)
      .subscribe(result => {
        this.steps = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  showAddNewModal() {
    let createStepDialog: BsModalRef;
    createStepDialog = this._modalService.show(
      CreateStepIndexDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
      }
    );
    createStepDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any){
    let editStepDialog: BsModalRef;
    editStepDialog = this._modalService.show(
      EditStepIndexDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }
      }
    );
    editStepDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id:number): void {
    abp.message.confirm(
      this.l('StepDeleteWarningMessage',  'StepsIndex'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._stepService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
}

showViewModal(id:number){
  this._modalService.show(
    ViewStepIndexDialogComponent,
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
      FilterStepIndexDialogComponent,
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




