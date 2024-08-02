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
  InvoiceItemForDeliveryDto,
  InvoiceServiceProxy,
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
  @Input() invoiceId: number;
  @Input() deliveryItems: CreateDeliveryItemDto[] = [];
  @Output() deliveryItemsChange = new EventEmitter<CreateDeliveryItemDto[]>();
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

  onCheck(args, invoiceItemId, receivedQuantity){
    if(this.deliveryItems == undefined)
      this.deliveryItems = [];

    const index = this.checkIfItemExist(invoiceItemId);
    if(index > -1){
      this.deliveryItems.splice(index,1);
    }else{
      var item = new CreateDeliveryItemDto();
      item.init({
        invoiceItemId: invoiceItemId,
        deliveredQuantity: receivedQuantity,
        batchNumber:''
      });

      this.deliveryItems.push(item);
    }
  }

  checkIfItemExist(invoiceItemId){
    const index = this.deliveryItems.findIndex(x=>x.invoiceItemId == invoiceItemId);
    return index;
  }

  updateQuantity(args, invoiceItemId) {
    var value = Number(args.target.value);
    const index = this.deliveryItems ? this.deliveryItems.findIndex((x) => x.invoiceItemId == invoiceItemId) : -1;
    if (index > -1) {
      this.deliveryItems[index].deliveredQuantity = Number(args.target.value);
    } 
    
    this.deliveryItemsChange.emit(this.deliveryItems);
  }

  updateBatchNumber(args,invoiceItemId){
    var value = args.target.value;
    const index = this.deliveryItems ? this.deliveryItems.findIndex((x) => x.invoiceItemId == invoiceItemId) : -1;
    if (index > -1) {
      this.deliveryItems[index].batchNumber = args.target.value;
    } 
    
    this.deliveryItemsChange.emit(this.deliveryItems);
  }

  checkDisabled(invoiceItemId:number){
    
    if(this.deliveryItems == undefined)
      return true;
    return !this.deliveryItems.some(x=>x.invoiceItemId === invoiceItemId);
  }
}
