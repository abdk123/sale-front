import { Component, Injector, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  DropdownDto,
  DeliveryServiceProxy,
  InvoiceServiceProxy,
  UpdateDeliveryDto,
  InvoiceDto,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "delivery-report",
  templateUrl: "./delivery-report.component.html",
  styleUrls: ["./delivery-report.component.scss"],
})
export class DeliveryReportComponent
  extends AppComponentBase
  implements OnInit
{
  delivery: UpdateDeliveryDto = new UpdateDeliveryDto();
  invoice: InvoiceDto = new InvoiceDto();
  deliveryId: number;
  saving: boolean;
  customers: DropdownDto[] = [];
  grNumberIsRequired: boolean = false;
  currencies = [
    { id: 0, name: this.l("Dollar") },
    { id: 1, name: this.l("Dinar") },
  ];

  deliveryStatus = [
    { id: 0, name: this.l("WaitingApprove") },
    { id: 1, name: this.l("Approved") },
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
      //this.initialInvoice();
    });
  }

  // initialInvoice() {
  //   this.invoiceService
  //     .getWithDetail(this.delivery.invoiceId)
  //     .subscribe((result) => (this.invoice = result));
  // }

  save() {
    if (
      !this.delivery.deliveryItems ||
      this.delivery.deliveryItems.length == 0
    ) {
      abp.message.warn(
        this.l("يرجى تحديد مادة واحدة على الاقل من مواد الفاتورة")
      );
    } else {
      this.grNumberIsRequired = false;
      if (
        this.delivery.status == 1 &&
        (this.delivery.grNumber == "" || this.delivery.grNumber == undefined)
      ) {
        this.grNumberIsRequired = true;
      } else {
        this.saving = true;
        this.deliveryService
          .update(this.delivery)
          .pipe(
            finalize(() => {
              this.saving = false;
              this.notify.info(this.l("SavedSuccessfully"));
              this.router.navigate(["/app/orders/manage-delivery"]);
            })
          )
          .subscribe((result) => {});
      }
    }
  }
}
