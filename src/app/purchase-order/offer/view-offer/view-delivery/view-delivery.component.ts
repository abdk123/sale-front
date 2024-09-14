import { Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IEnumValue } from '@app/layout/content-template/page-default/page-field';
import { AppComponentBase } from '@shared/app-component-base';
import { DeliveryDto, DeliveryServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-delivery',
  templateUrl: './view-delivery.component.html',
  styleUrls: ['./view-delivery.component.scss']
})
export class ViewDeliveryComponent extends AppComponentBase implements OnChanges {
  @Input() offerId: number;
  deliveries: DeliveryDto[] = [];
  status: IEnumValue[] = [
    { value: 0, text: this.l("NotPriced") },
    { value: 1, text: this.l("PendingReceived") },
    { value: 2, text: this.l("PartialReceive") },
    { value: 3, text: this.l("Received") },
  ];
  currency: IEnumValue[] = [
    { value: 1, text: this.l("Dollar") },
    { value: 0, text: this.l("Dinar") },
  ];
  
  constructor(injector: Injector, private deliveryService: DeliveryServiceProxy) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.offerId) {
      this.initialDelivery();
    }
  }

  initialDelivery() {
    this.deliveryService.getWithDetailsById()
  }
}
