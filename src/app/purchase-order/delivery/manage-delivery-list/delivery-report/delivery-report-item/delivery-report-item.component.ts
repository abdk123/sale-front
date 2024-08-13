import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  ChangeItemStatusInputDto,
  CreateDeliveryItemDto,
  DeliveryItemDto,
  DeliveryServiceProxy,
  InvoiceItemForDeliveryDto,
  InvoiceServiceProxy,
  UpdateDeliveryItemDto,
} from "@shared/service-proxies/service-proxies";
import { forEach } from "lodash-es";

@Component({
  selector: "delivery-report-item",
  templateUrl: "./delivery-report-item.component.html",
  styleUrls: ["./delivery-report-item.component.scss"],
})
export class DeliveryReportItemComponent
  extends AppComponentBase
  implements OnInit, OnChanges
{
  @Input() deliveryId: number;
  @Input() deliveryItems: UpdateDeliveryItemDto[] = [];
  @Output() deliveryItemsChange = new EventEmitter<UpdateDeliveryItemDto[]>();
  items: DeliveryItemDto[] = [];
  currencies = [
    { id: 0, name: this.l("Dollar") },
    { id: 1, name: this.l("Dinar") },
  ];

  constructor(
    injector: Injector,
    private deliveryService: DeliveryServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.deliveryId) {
      this.initialItems();
    }
  }

  initialItems() {
    this.deliveryService
      .getWithDetailsById(this.deliveryId)
      .subscribe((result) => {
        this.items = result.deliveryItems;
      });
  }

  getSaleType(item: DeliveryItemDto) {
    return item.invoiceItem.offerItem.addedBySmallUnit == true
      ? `${this.l("SmallUnit")}`
      : `${this.l("LargeUnit")}`;
  }

  checkIfItemExist(invoiceItemId) {
    const index = this.deliveryItems.findIndex(
      (x) => x.invoiceItemId == invoiceItemId
    );
    return index > -1;
  }

  getQuantity(invoiceItemId) {
    return this.deliveryItems.find((x) => x.invoiceItemId == invoiceItemId)
      ?.deliveredQuantity;
  }

  getBatchNumber(invoiceItemId) {
    return this.deliveryItems.find((x) => x.invoiceItemId == invoiceItemId)
      ?.batchNumber;
  }

  changeDeliveryStatus(status: number, id: number) {
    this.removeFromDeliveryItems(id);
    let input = new ChangeItemStatusInputDto();
    input.init({ id: id, status: status });
    this.deliveryService.changeItemStatus(input).subscribe((result) => {
      this.deliveryItems.find((x) => x.id == result.id).deliveryItemStatus = status;
    });
  }

  removeFromDeliveryItems(id: number) {
    const index = this.deliveryItems.findIndex((x) => x.id == id);
    if (index > -1) {
      this.deliveryItems.splice(index, 1);
    }
    this.deliveryItemsChange.emit(this.deliveryItems);
  }

  onCheck(checked: boolean, item: DeliveryItemDto) {
    if (checked) {
      let index = this.deliveryItems.findIndex((x) => x.id == item.id);
      if (index == -1) {
        let deliveryItem = new UpdateDeliveryItemDto();
        deliveryItem.init({
          id: item.id,
          deliveryItemStatus: item.deliveryItemStatus,
          deliveredQuantity: item.deliveredQuantity,
          invoiceItemId: item.invoiceItem.id,
          batchNumber: item.batchNumber,
        });
        this.deliveryItems.push(deliveryItem);
      }
      this.deliveryItemsChange.emit(this.deliveryItems);
    } else {
      this.removeFromDeliveryItems(item.id);
    }
  }

  checkIfSelected(id: number) {
    if (this.deliveryItems)
      return this.deliveryItems.findIndex((x) => x.id == id) > -1;
    return false;
  }
}
