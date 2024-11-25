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
  CreateDeliveryItemDto,
  OfferItemForDeliveryDto,
  OfferServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "send-delivery-item",
  templateUrl: "./send-delivery-item.component.html",
  styleUrls: ["./send-delivery-item.component.scss"],
})
export class SendDeliveryItemComponent
  extends AppComponentBase
  implements OnInit, OnChanges
{
  @Input() customerId: number;
  @Input() deliveryItems: CreateDeliveryItemDto[] = [];
  @Output() deliveryItemsChange = new EventEmitter<CreateDeliveryItemDto[]>();
  items: OfferItemForDeliveryDto[] = [];
  currencies = [
    { id: 1, name: this.l("Dollar") },
    { id: 0, name: this.l("Dinar") },
  ];

  constructor(injector: Injector, private offerService: OfferServiceProxy) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.customerId && this.items.length == 0) {
      this.offerService
        .getForDelivery(this.customerId)
        .subscribe((result) => (this.items = result));
    }
  }

  ngOnInit(): void {
    //this.offerId = this.route.snapshot?.params?.offerId;
  }

  getSaleType(addedBySmallUnit) {
    return addedBySmallUnit
      ? `${this.l("SmallUnit")}`
      : `${this.l("LargeUnit")}`;
  }

  onCheck(args, offerItemId, receivedQuantity) {
    if (this.deliveryItems == undefined) this.deliveryItems = [];

    const index = this.checkIfItemExist(offerItemId);
    if (index > -1) {
      this.deliveryItems.splice(index, 1);
    } else {
      var item = new CreateDeliveryItemDto();
      item.init({
        offerItemId: offerItemId,
        deliveredQuantity: receivedQuantity,
        batchNumber: "",
      });

      this.deliveryItems.push(item);
    }
  }

  checkIfItemExist(offerItemId) {
    const index = this.deliveryItems.findIndex(
      (x) => x.offerItemId == offerItemId
    );
    return index;
  }

  updateQuantity(args, offerItemId) {
    
    var value = Number(args.target.value);
    const index = this.deliveryItems
      ? this.deliveryItems.findIndex((x) => x.offerItemId == offerItemId)
      : -1;
    if (index > -1) {
      this.deliveryItems[index].deliveredQuantity = Number(args.target.value);
    }

    this.deliveryItemsChange.emit(this.deliveryItems);
  }

  updateBatchNumber(args, offerItemId) {
    var value = args.target.value;
    const index = this.deliveryItems
      ? this.deliveryItems.findIndex((x) => x.offerItemId == offerItemId)
      : -1;
    if (index > -1) {
      this.deliveryItems[index].batchNumber = args.target.value;
    }

    this.deliveryItemsChange.emit(this.deliveryItems);
  }

  checkDisabled(offerItemId: number) {
    if (this.deliveryItems == undefined) return true;
    return !this.deliveryItems.some((x) => x.offerItemId === offerItemId);
  }
}
