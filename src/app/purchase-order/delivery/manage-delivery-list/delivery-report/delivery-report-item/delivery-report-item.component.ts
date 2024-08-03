import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateDeliveryItemDto, InvoiceItemForDeliveryDto, InvoiceServiceProxy, UpdateDeliveryItemDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'delivery-report-item',
  templateUrl: './delivery-report-item.component.html',
  styleUrls: ['./delivery-report-item.component.scss']
})
export class DeliveryReportItemComponent extends AppComponentBase
implements OnInit, OnChanges
{
@Input() invoiceId: number;
@Input() deliveryItems: UpdateDeliveryItemDto[] = [];
@Output() deliveryItemsChange = new EventEmitter<UpdateDeliveryItemDto[]>();
items: InvoiceItemForDeliveryDto[] = [];
currencies = [
  { id: 0, name: this.l("Dollar") },
  { id: 1, name: this.l("Dinar") },
];

constructor(injector: Injector, private invoiceService: InvoiceServiceProxy) {
  super(injector);
}

ngOnChanges(changes: SimpleChanges): void {
  if (this.invoiceId) {
    this.invoiceService.getForDelivery(this.invoiceId)
    .subscribe(result => this.items = result);
  }
}

ngOnInit(): void {
  //this.invoiceId = this.route.snapshot?.params?.invoiceId;
}

getSaleType(addedBySmallUnit) {
  return addedBySmallUnit
    ? `${this.l("SmallUnit")}`
    : `${this.l("LargeUnit")}`;
}


checkIfItemExist(invoiceItemId){
  const index = this.deliveryItems.findIndex(x=>x.invoiceItemId == invoiceItemId);
  return index;
}

getQuantity(invoiceItemId) {
  return this.deliveryItems.find((x) => x.invoiceItemId == invoiceItemId)?.deliveredQuantity;
}

getBatchNumber(invoiceItemId){
  return this.deliveryItems.find((x) => x.invoiceItemId == invoiceItemId)?.batchNumber;
}


}
