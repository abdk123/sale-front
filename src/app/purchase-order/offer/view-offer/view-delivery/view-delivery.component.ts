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
  @Input() offerItemsIds: number[] = [];
  deliveries: DeliveryDto[] = [];
  status: IEnumValue[] = [
    { value: 0, text: this.l("WaitingApprove") },
    { value: 1, text: this.l("Approved") },
    { value: 2, text: this.l("Shipped") },
    { value: 3, text: this.l("Delivered") },
    { value: 3, text: this.l("Rejected") },
    { value: 3, text: this.l("PartialRejected") },
    { value: 3, text: this.l("CreateSaleInoice") },
    { value: 3, text: this.l("Paid") },
  ];
  itemStatus: IEnumValue[] = [
    { value: 0, text: this.l("Pending") },
    { value: 1, text: this.l("Approved") },
    { value: 2, text: this.l("RejectAndReturnToSupplier") },
    { value: 3, text: this.l("RejectAndRecordAsDamaged") },
  ];
  currency: IEnumValue[] = [
    { value: 1, text: this.l("Dollar") },
    { value: 0, text: this.l("Dinar") },
  ];
  
  constructor(injector: Injector, private deliveryService: DeliveryServiceProxy) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.offerItemsIds?.length > 0) {
      this.initialDelivery();
    }
  }

  initialDelivery() {
    this.deliveryService.getByOfferItems(this.offerItemsIds)
    .subscribe(result=>{
      this.deliveries = result;
    })
  }

  getStatus(value){
    return this.status.find(x=>x.value == value)?.text;
  }

  getItemStatus(value){
    return this.itemStatus.find(x=>x.value == value)?.text;
  }

  getCurrency(value){
    return this.currency.find(x=>x.value == value)?.text;
  }
}
