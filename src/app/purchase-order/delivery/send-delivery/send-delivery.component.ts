import { Component, Injector, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  DropdownDto,
  CreateDeliveryDto,
  DeliveryServiceProxy,
  OfferDto,
  OfferServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "send-delivery",
  templateUrl: "./send-delivery.component.html",
  styleUrls: ["./send-delivery.component.scss"],
})
export class SendDeliveryComponent extends AppComponentBase implements OnInit {
  offer: OfferDto = new OfferDto();
  deliveryDto: CreateDeliveryDto = new CreateDeliveryDto();
  offerId: number;
  saving: boolean;
  customers: DropdownDto[] = [];
  currencies = [
    { id: 0, name: this.l("Dinar") },
    { id: 1, name: this.l("Dollar") },
    
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private offerService: OfferServiceProxy,
    private deliveryService: DeliveryServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.offerId = this.route.snapshot?.params?.offerId;
    this.initialOffer();
  }

  initialOffer() {
    this.offerService.getOfferWithDetailId(this.offerId).subscribe((result) => {
      this.offer = result;
    });
  }

  save() {
    this.saving = true;
    this.deliveryDto.customerId = this.offer.customerId;
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
