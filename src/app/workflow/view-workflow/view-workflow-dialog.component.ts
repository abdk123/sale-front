import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WorkflowDto, WorkflowServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-workflow-dialog',
  templateUrl: './view-workflow-dialog.component.html',

})
export class ViewWorkflowDialogComponent extends AppComponentBase {
  saving = false;
  editable: true;
  id: number;
  Workflow: WorkflowDto = new WorkflowDto();

  constructor(injector: Injector,
    private _workflowservice: WorkflowServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initWorkflow();
  }

  initWorkflow() {
    (this.id)
    this._workflowservice.get(this.id).subscribe((result) => {
      this.Workflow = result;
    });
  }
}
