import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateWorkflowStepIndexDto, WorkflowStepIndexServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-step-index-dialog',
  templateUrl: './create-step-index-dialog.component.html',
})

export class CreateStepIndexDialogComponent extends AppComponentBase {
  saving = false;
  stepIndex = new CreateWorkflowStepIndexDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _stepIndexService: WorkflowStepIndexServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void { 
  }

  save(): void {
    this.saving = true;
    this._stepIndexService.
      create(
        this.stepIndex
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
