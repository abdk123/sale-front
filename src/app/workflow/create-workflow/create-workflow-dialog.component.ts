import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateWorkflowDto, WorkflowServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-workflow-dialog',
  templateUrl: './create-workflow-dialog.component.html',

})
export class CreateWorkflowDialogComponent extends AppComponentBase {
  saving = false;
  workflow = new CreateWorkflowDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _workflowService: WorkflowServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }



  save(): void {
    this.saving = true;
    this._workflowService.
      create(
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
