import { Component, Injector, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { DeliveryDto, CreateDeliveryDto, DropdownDto, DeliveryServiceProxy, InvoiceServiceProxy, UpdateDeliveryDto, InvoiceDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.scss']
})
export class DeliveryReportComponent extends AppComponentBase implements OnInit {
  delivery: UpdateDeliveryDto = new UpdateDeliveryDto();
  invoice: InvoiceDto = new InvoiceDto();
  deliveryId: number;
  saving: boolean;
  customers: DropdownDto[] = [];
  currencies = [
    { id: 0, name: this.l("Dollar") },
    { id: 1, name: this.l("Dinar") },
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private deliveryService: DeliveryServiceProxy,
    private invoiceService: InvoiceServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.deliveryId = this.route.snapshot?.params?.deliveryId;
    this.initialDelivery();
  }

  initialDelivery() {
    this.deliveryService.getForEdit(this.deliveryId).subscribe((result) => {
      this.delivery = result;
      this.initialInvoice();
    });
  }

  initialInvoice() {
 this.invoiceService.getWithDetail(this.delivery.invoiceId)
 .subscribe(result=>this.invoice = result)
  }

  save() {
    this.saving = true;
    this.deliveryService
      .update(this.delivery)
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
