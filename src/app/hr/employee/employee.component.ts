import { Component, Injector, OnInit } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { EmployeeDto, EmployeeServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@Component({
  selector: "employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent
  extends FullPagedListingComponentBase<EmployeeDto>
  implements OnInit
{
  employees: EmployeeDto[] = [];
  fields = [
    {
      label: this.l("FullName"),
      name: "fullName",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("PhoneNumber"),
      name: "phoneNumber",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("Address"),
      name: "address",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("Salary"),
      name: "salary",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("Email"),
      name: "email",
      sortable: true,
      type: "string",
    },
  ];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _employeeService: EmployeeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this._employeeService.read(request).subscribe((result) => {
      this.employees = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    let createEmployeeDialog: BsModalRef;
    createEmployeeDialog = this._modalService.show(CreateEmployeeComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
    createEmployeeDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any) {
    let editEmployeeDialog: BsModalRef;
    editEmployeeDialog = this._modalService.show(EditEmployeeComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });
    editEmployeeDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("EmployeeDeleteWarningMessage", "Employees"),
      undefined,
      (result: boolean) => {
        if (result) {
          this._employeeService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._modalService.show(ViewEmployeeComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    });
  }

  showFilterDialog(status) {}
}
