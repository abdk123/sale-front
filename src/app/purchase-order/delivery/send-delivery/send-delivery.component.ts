import { Component, Injector, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  InvoiceDto,
  DropdownDto,
  InvoiceServiceProxy,
  TransportCompanyServiceProxy,
  ClearanceCompanyServiceProxy,
  CreateDeliveryDto,
  DeliveryServiceProxy,
  CustomerServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "send-delivery",
  templateUrl: "./send-delivery.component.html",
  styleUrls: ["./send-delivery.component.scss"],
})
export class SendDeliveryComponent extends AppComponentBase implements OnInit {
  invoice: InvoiceDto = new InvoiceDto();
  deliveryDto: CreateDeliveryDto = new CreateDeliveryDto();
  invoiceId: number;
  saving: boolean;
  customers: DropdownDto[] = [];
  currencies = [
    { id: 0, name: this.l("Dollar") },
    { id: 1, name: this.l("Dinar") },
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private invoiceService: InvoiceServiceProxy,
    private deliveryService: DeliveryServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot?.params?.invoiceId;
    this.initialInvoice();
  }

  initialInvoice() {
    this.invoiceService.getWithDetail(this.invoiceId).subscribe((result) => {
      this.invoice = result;
    });
  }

  save() {
    this.saving = true;
    this.deliveryDto.customerId = this.invoice.customerId;
    this.deliveryDto.invoiceId = this.invoice.id;
    this.deliveryService
      .create(this.deliveryDto)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notify.info(this.l("SavedSuccessfully"));
          this.router.navigate(["/app/orders/deliveries"]);
        })
      )
      .subscribe((result) => {});
  }
}
