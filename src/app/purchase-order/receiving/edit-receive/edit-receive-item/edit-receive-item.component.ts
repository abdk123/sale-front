import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateReceivingItemDto, InvoiceItemDto, InvoiceServiceProxy, ReceivingItemDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: "edit-receive-item",
  templateUrl: "./edit-receive-item.component.html",
  styleUrls: ["./edit-receive-item.component.scss"],
})
export class EditReceiveItemComponent
  extends AppComponentBase
  implements OnInit
{
  @Input() invoiceId: number;
  @Input() items: ReceivingItemDto[] = [];
  @Output() itemsChange = new EventEmitter<ReceivingItemDto[]>();
  invoiceItems: InvoiceItemDto[] = [];
  constructor(injector: Injector, private invoiceService: InvoiceServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialInvoice();
  }

  enteredQ(id){
    let item = this.items.find(x=>x.invoiceItemId === id);
    const quantity = item != undefined ? item.receivedQuantity : 0;
    return quantity;
  }

  initialInvoice() {
    this.invoiceService.getWithDetail(this.invoiceId).subscribe((result) => {
      this.invoiceItems = result?.invoiseDetails;
    });
  }

  getPackingUnit(item: InvoiceItemDto) {
    if (item.offerItem?.addedBySmallUnit) {
      return item.offerItem?.size?.name;
    }
    return item.offerItem?.material?.stocks[0]?.init?.name;
  }

  getSaleType(addedBySmallUnit) {
    return addedBySmallUnit
      ? `${this.l("SmallUnit")}`
      : `${this.l("LargeUnit")}`;
  }

  updateInvoiceQuantity(args, invoiceItemId) {
    var value = Number(args.target.value);

    //return;
    const index = this.items
      ? this.items.findIndex((x) => x.invoiceItemId == invoiceItemId)
      : -1;
    if (index > -1) {
      if (value == 0 && value == undefined) {
        this.items.splice(index, 0);
      } else {
        this.items[index].receivedQuantity = Number(args.target.value);
      }
    } else {
      var item = new ReceivingItemDto();
      item.init({
        invoiceItemId: invoiceItemId,
        receivedQuantity: Number(args.target.value),
      });

      if (this.items == undefined) this.items = [];
      this.items.push(item);
    }

    this.itemsChange.emit(this.items);
  }
}
