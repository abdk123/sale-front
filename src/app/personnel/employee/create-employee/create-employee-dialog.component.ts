import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {CreateEmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
})

export class CreateEmployeeDialogComponent extends AppComponentBase {
  saving = false;
  employee = new CreateEmployeeDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  save(): void {
    this.employee.dateOfBirth.toString();
    this.saving = true;
    this._employeeService.
      create(
        this.employee
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
