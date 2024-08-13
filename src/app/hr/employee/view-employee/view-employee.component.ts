import { Component, OnInit } from '@angular/core';
import { EmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "view-employee",
  templateUrl: "./view-employee.component.html",
  styleUrls: ["./view-employee.component.scss"],
})
export class ViewEmployeeComponent implements OnInit {
  employee = new EmployeeDto();
  id: number;
  editable: true;
  constructor(
    private _employeeService: EmployeeServiceProxy,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initEmployee(this.id);
  }

  initEmployee(id: number) {
    this._employeeService.get(id).subscribe((result) => {
      this.employee = result;
    });
  }
}
