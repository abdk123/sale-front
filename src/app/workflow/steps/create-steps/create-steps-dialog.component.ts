import { Component, EventEmitter, Injector, Output, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ChildServiceProxy, CreateChildDto, CreateWorkflowStepActionDto, CreateWorkflowStepDto, WorkflowStepIndexForDropdownDto, WorkflowStepServiceProxy, WorkflowStepIndexServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-steps-dialog',
  templateUrl: './create-steps-dialog.component.html',
})
export class CreateStepsDialogComponent extends AppComponentBase {
  saving = false;
  parentId:number
  step:CreateWorkflowStepDto = new CreateWorkflowStepDto();
  workFlowIndexs: WorkflowStepIndexForDropdownDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _stepService : WorkflowStepServiceProxy,
    private _workFlowIndexService:WorkflowStepIndexServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
 ngOnInit(){
    this.step.actions=[];
    this.step.groups=[];
    this.initWorkFlowIndex();

  }
  initWorkFlowIndex() {
    this._workFlowIndexService.getAllForDropdown().subscribe((result: WorkflowStepIndexForDropdownDto[]) => {
      this.workFlowIndexs = result;
    });
  }
  addWorkFlowAction() {
    console.log( this.step.actions)
    const index = this.step.actions.length ;
    //list have one element at least
    if(index>0)
    {
      if ((this.step.actions[index-1].name == "" || this.step.actions[index-1].type == null) ) {
        this.notify.error(this.l('FillFieldsFirst'));
      }
      else{
        let action = new CreateWorkflowStepActionDto();
        this.step.actions.push(action);
      }
    }
    //if the list empty 
    else
    {
      let action = new CreateWorkflowStepActionDto();
      this.step.actions.push(action);
    }
  }
  removeWorkFlowAction(i: number) {
    this.step.actions.splice(i, 1);
  }
  save(): void {
    this.saving = true;
    this.step.workflowId=this.parentId;
    this._stepService.
      create(
        this.step
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
