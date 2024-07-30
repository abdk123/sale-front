import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { InvoiceDto, ReceivingDto, DropdownDto, InvoiceServiceProxy, TransportCompanyServiceProxy, ClearanceCompanyServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: "send-delivery",
  templateUrl: "./send-delivery.component.html",
  styleUrls: ["./send-delivery.component.scss"],
})
export class SendDeliveryComponent extends AppComponentBase implements OnInit {
  invoice: InvoiceDto = new InvoiceDto();
  receiveDto: ReceivingDto = new ReceivingDto();
  invoiceId: number;
  saving: boolean;
  transportCompanies: DropdownDto[] = [];
  clearanceCompanies: DropdownDto[] = [];

  constructor(
    injector: Injector,
    private router: Router,
    private invoiceService: InvoiceServiceProxy,
    private transportCompanyService: TransportCompanyServiceProxy,
    private clearanceCompanyServiceProxy: ClearanceCompanyServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot?.params?.invoiceId;
    this.initialInvoice();
    this.initialTransportCompanies();
    this.initialClearanceCompanies();
  }

  initialTransportCompanies() {
    this.transportCompanyService
      .getForDropdown()
      .subscribe((result) => (this.transportCompanies = result));
  }

  initialClearanceCompanies() {
    this.clearanceCompanyServiceProxy
      .getForDropdown()
      .subscribe((result) => (this.clearanceCompanies = result));
  }

  initialInvoice() {
    this.invoiceService.getWithDetail(this.invoiceId).subscribe((result) => {
      this.invoice = result;
    });
  }

  save() {}
}
