import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { DateFormattedPipe } from '@shared/pipes/date-formatted.pipe';
import { OfferDto, UpdateOfferItemDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: "print-offer",
  templateUrl: "./print-offer.component.html",
  styleUrls: ["./print-offer.component.scss"],
})
export class PrintOfferComponent extends AppComponentBase implements OnInit,AfterViewInit {
  offer: OfferDto = new OfferDto();
  offerItems: UpdateOfferItemDto[] = [];

  constructor(injector: Injector, private _route: ActivatedRoute) {
    super(injector);
  }
  ngAfterViewInit(): void {
    window.print();
  }

  ngOnInit(): void {
    this._route.queryParams;
    this._route.queryParams.subscribe((x) => {
      this.offer = JSON.parse(x[0]);
      this.offerItems = this.offer.offerItems;
    });
  }  

  Calculate(q, up) {
    return q * up;
  }

  calculateTotalQuantity() {
    const totalQuantity = this.offerItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return totalQuantity;
  }

  calculateTotalPrice() {
    const totalPrice = this.offerItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    return totalPrice;
  }
}
