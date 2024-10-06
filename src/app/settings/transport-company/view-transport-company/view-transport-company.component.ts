import { Component, OnInit } from "@angular/core";
import {
  TransportCompanyDto,
  TransportCompanyServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "view-transport-company",
  templateUrl: "./view-transport-company.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class ViewTransportCompanyComponent implements OnInit {
  transportCompany = new TransportCompanyDto();
  id: number;
  editable: true;
  constructor(
    private _transportCompanyService: TransportCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initTransportCompany(this.id);
  }

  initTransportCompany(id: number) {
    this._transportCompanyService.get(id).subscribe((result) => {
      this.transportCompany = result;
    });
  }
}
