import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { WorkflowStepIndexServiceProxy, WorkflowStepIndexDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-step-dialog',
  templateUrl: './view-step-index-dialog.component.html',
})

export class ViewStepIndexDialogComponent extends AppComponentBase {
  saving = false;
  editable: true;
  id: number;
  stepIndex: WorkflowStepIndexDto = new WorkflowStepIndexDto();

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
    (this.id)
    this._stepService.get(this.id).subscribe((result) => {
      this.stepIndex = result;
    });
  }
}
