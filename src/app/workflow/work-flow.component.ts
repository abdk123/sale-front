import { Component, Injector, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterDto, FullPagedRequestDto, WorkflowDto, WorkflowServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateWorkflowDialogComponent } from './create-workflow/create-workflow-dialog.component';
import { EditWorkflowDialogComponent } from './edit-workflow/edit-workflow-dialog.component';
import { ViewWorkflowDialogComponent } from './view-workflow/view-workflow-dialog.component';
import { FilterWorkflowDialogComponent } from './filter-workflow/filter-workflow-dialog.component';
import { DetailsData } from '@shared/components/details/details.component';

@Component({
  selector: 'work-flow',
  templateUrl: './work-flow.component.html',
})
export class WorkFlowComponent  extends FullPagedListingComponentBase<WorkflowDto> implements OnInit {
  Workflows: WorkflowDto[] = [];
  loadDetails: boolean = false;

  workflowId: number;
  detailData:DetailsData[]=[{
    icon:'iconsminds-repeat-4',
    label:'Steps',
    destinationRoute:"app/workflow/steps",},
  {
    icon:'iconsminds-notepad',
    label:' Approvals',
    destinationRoute:"app/personnel/children",
  }]
  fields = [
    { label: this.l('Title'), name: 'title', sortable: true, type: 'string' },
    { label: this.l('Description'), name: 'description', type: 'string' },

  ];

constructor(injector: Injector,
    private _modalService: BsModalService,
    private _WorkflowService: WorkflowServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._WorkflowService.read(request)
      .subscribe(result => {
        this.Workflows = result.items;

        this.showPaging(result, pageNumber);
      })

  }

  showAddNewModal() {
    let createWorkflowDialog: BsModalRef;
    createWorkflowDialog = this._modalService.show(
      CreateWorkflowDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',

      }
    );
    createWorkflowDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editWorkflowDialog: BsModalRef;
    editWorkflowDialog = this._modalService.show(
      EditWorkflowDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }

      }
    );
    editWorkflowDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }


  getWorkflowIdForSteps(id: number) {
    this.loadDetails = true;
    this.workflowId = id;



  }
  deleteItem(id:number): void {


    abp.message.confirm(
      this.l('WorkflowDeleteWarningMessage',  'Workflows'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._WorkflowService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );

}
showViewModal(id:number){

  this._modalService.show(
    ViewWorkflowDialogComponent,
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
      FilterWorkflowDialogComponent,
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




