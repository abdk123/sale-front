import { Component, OnInit } from '@angular/core';
import { ClearanceCompanyDto, ClearanceCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "view-clearance-company",
  templateUrl: "./view-clearance-company.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class ViewClearanceCompanyComponent implements OnInit {
  clearanceCompany = new ClearanceCompanyDto();
  id: number;
  editable: true;
  constructor(
    private _clearanceCompanyService: ClearanceCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initClearanceCompany(this.id);
  }

  initClearanceCompany(id: number) {
    this._clearanceCompanyService.get(id).subscribe((result) => {
      this.clearanceCompany = result;
    });
  }
}
