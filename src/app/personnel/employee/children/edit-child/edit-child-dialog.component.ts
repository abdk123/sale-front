import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ChildServiceProxy, UpdateChildDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-child-dialog',
  templateUrl: './edit-child-dialog.component.html',
})
export class EditChildDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  employeeId:number;
  child = new UpdateChildDto();
  @Output() onSave = new EventEmitter<any>();
  dateOfBirth: Date;
  constructor(injector: Injector,
    private _childService: ChildServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initEmployee();
  }
  initEmployee() {
    this._childService.getForEdit(this.id).subscribe((result) => {
      this.child = result;
     
    });
  }
  save(): void {
    this.child.employeeId=this.employeeId;
    this.saving = true;
    this._childService.
      update(
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

