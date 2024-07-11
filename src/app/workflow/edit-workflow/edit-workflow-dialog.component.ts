import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UpdateWorkflowDto, WorkflowServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-workflow-dialog',
  templateUrl: './edit-workflow-dialog.component.html',

})
export class EditWorkflowDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  workflow = new UpdateWorkflowDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _workflowService: WorkflowServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {

    this.initalWorkflow()

  }

  initalWorkflow()
  {
    this._workflowService.get(this.id).subscribe((result)=>{
      this.workflow=result;
    })
  }

  save(): void {
    this.saving = true;
    this._workflowService.
      update(
        this.workflow
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        (response);
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
