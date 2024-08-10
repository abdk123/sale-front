import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UpdateEmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.scss"],
})
export class EditEmployeeComponent extends AppComponentBase implements OnInit {
  saving = false;
  employee = new UpdateEmployeeDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    public _employeeService: EmployeeServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialEmployee();
  }

  initialEmployee() {
    this._employeeService
      .getForEdit(this.id)
      .subscribe((result: UpdateEmployeeDto) => {
        this.employee = result;
      });
  }

  save(): void {
    this.saving = true;
    this._employeeService
      .update(this.employee)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
