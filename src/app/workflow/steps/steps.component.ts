import { ActivatedRoute, Route, Router } from '@angular/router';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { Component, Injector, OnInit, } from '@angular/core';
import { FullPagedRequestDto, WorkflowServiceProxy, WorkflowStepDto, WorkflowStepServiceProxy,  } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateStepsDialogComponent } from './create-steps/create-steps-dialog.component';
import { EditStepsDialogComponent } from './edit-steps/edit-steps-dialog.component';
import { IEnumValue } from '@app/layout/content-template/page-default/page-field';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
})
export class StepsComponent extends FullPagedListingComponentBase<WorkflowStepDto>  implements OnInit{

  steps: WorkflowStepDto[] = [];
  parentId:number;
  loadDetails: boolean=false;
  status:IEnumValue[]=[
    {value:0,text:this.l("Active")},
    {value:1,text:this.l("InActive")},
  ];

  fields = [
    { label: this.l('Title'), name: 'title', sortable: false, type: 'string' },
    { label: this.l('Status'), name: 'status',  type: 'enum' , enumValue: this.status ,sortable: true },
  ];



  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _WorkflowStepService: WorkflowStepServiceProxy,
    public bsModalRef: BsModalRef,
    private _route:ActivatedRoute,
    private _router:Router) {
    super(injector);
  }

  ngOnInit(): void {
    this.getEmloyeeId();
    }
    getEmloyeeId() {
      this._route.params.subscribe(params => {
        this.parentId = params['id']; 
        this.refresh()
      });
    }
  
  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._WorkflowStepService.getAllByWorkflowId(this.parentId)
      .subscribe(result => {
        this.steps = result;
        // this.showPaging(result, pageNumber);
      })
  }

  getParentIdForChildren(id: number) {
    this.loadDetails=true
    this.parentId=id;
  }

  showAddNewModal() {
    let createStepsDialog: BsModalRef;
    createStepsDialog = this._modalService.show(
      CreateStepsDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          parentId:this.parentId
        }

      }
    );
    createStepsDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showEditModal(id: any){
    let editStepsDialog: BsModalRef;
    editStepsDialog = this._modalService.show(
      EditStepsDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id,
          parentId:this.parentId
        }

      }
    );
    editStepsDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
  showFilterDialog(status) {
    // if (status == 'clear_filter') {
    //   this.request.filtering = undefined;
    //   this.refresh();
    //   return;
    // }
    // let filterDialog: BsModalRef;
    // filterDialog = this._modalService.show(
    //   FilterEmployeeDialogComponent,
    //   {
    //     backdrop: true,
    //     ignoreBackdropClick: true,
    //     initialState: {
    //       filterInput: this.request.filtering,
    //     },
    //     class: 'modal-lg',
    //   }
    // );
    // filterDialog.content.onSave.subscribe((result: FilterDto) => {
    //   this.request.filtering = result;
    //   this._modalService.hide();
    //   this.refresh();
    // });
  }


}
