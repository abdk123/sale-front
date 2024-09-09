import { Component, Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateDeliveryItemDto,
  CustomerDto,
  CustomerServiceProxy,
  DeliveryDto,
  DeliveryItemDto,
  OfferServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "print-delivery",
  templateUrl: "./print-delivery.component.html",
  styleUrls: ["./print-delivery.component.scss"],
  providers: [OfferServiceProxy],
})
export class PrintDeliveryComponent extends AppComponentBase {
  delivery: DeliveryDto = new DeliveryDto();
  deliveryItems: DeliveryItemDto[] = [];
  customer: CustomerDto = new CustomerDto();

  constructor(
    injector: Injector,
    private _route: ActivatedRoute,
    private customerService: CustomerServiceProxy
  ) {
    super(injector);

    this._route.queryParams;
    this._route.queryParams.subscribe((x) => {
      this.delivery = JSON.parse(x[0]);
      this.customerService.get(this.delivery.customerId).subscribe((res) => {
        this.customer = res;
      });
      this.deliveryItems = this.delivery.deliveryItems;
      setTimeout(() => {
        print();
      }, 1000);
    });
  }
}
