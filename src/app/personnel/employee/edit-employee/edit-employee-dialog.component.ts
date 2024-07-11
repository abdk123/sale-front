import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeServiceProxy, UpdateEmployeeDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
})
export class EditEmployeeDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  employee = new UpdateEmployeeDto();
  @Output() onSave = new EventEmitter<any>();
  dateOfBirth: Date;
  constructor(injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    console.log(this.id)
    this.initEmployee();
  }
  initEmployee() {
    this._employeeService.getForEdit(this.id).subscribe((result) => {
      
      this.employee = result;
      this.dateOfBirth = new Date(this.employee.dateOfBirth);
     
    });
  }
  save(): void {
   
    this.employee.dateOfBirth= this.dateOfBirth.toString();
    this.saving = true;
    this._employeeService.
      update(
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
