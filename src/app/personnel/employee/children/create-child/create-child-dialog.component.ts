import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ChildServiceProxy, CreateChildDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-child-dialog',
  templateUrl: './create-child-dialog.component.html',
})
export class CreateChildDialogComponent extends AppComponentBase {
  saving = false;
  parentId:number
  child = new CreateChildDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _childService : ChildServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  save(): void {
    this.saving = true;
    this.child.employeeId=this.parentId;
    this._childService.
      create(
        this.child
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
