import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UpdateWorkflowStepIndexDto, WorkflowStepIndexServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-step-dialog',
  templateUrl: './edit-step-index-dialog.component.html',

})
export class EditStepIndexDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  stepIndex = new UpdateWorkflowStepIndexDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _stepService: WorkflowStepIndexServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initStep();
  }
  initStep() {
    this._stepService.getForEdit(this.id).subscribe((result) => {
      this.stepIndex = result;
    });
  }

  save(): void {
    debugger;
    this.saving = true;
    this._stepService
      .update(
        this.stepIndex
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
      }
      );
  }
}
