import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CustomerServiceProxy,
  DeliveryServiceProxy,
  DropdownDto,
  RejectDeliveryDto,
  RejectDeliveryServiceProxy,
  RejectedMaterialDto,
} from "@shared/service-proxies/service-proxies";
import { result } from "lodash-es";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "reject-dialog",
  templateUrl: "./reject-dialog.component.html",
  styleUrls: ["./reject-dialog.component.scss"],
})
export class RejectDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  @Output() onSave = new EventEmitter<any>();
  model: RejectDeliveryDto = new RejectDeliveryDto();
  rejectedMaterials: RejectedMaterialDto[] = [];
  quantity: number;
  deliveryItemId: number;
  deliveryId: number;
  rejectedQuantity: number;
  rejectionDate: Date = new Date();
  suppliers: DropdownDto[] = [];
  materialSource = [
    { id: 0, name: this.l("Store") },
    { id: 1, name: this.l("Supplier") },
  ];
  constructor(
    injector: Injector,
    private deliveryService: DeliveryServiceProxy,
    private customerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialCustomer();
    this.model.deliveryId = this.deliveryId;
    this.model.deliveryItemId = this.deliveryItemId;
    this.model.rejectedMaterials = []; 
    this.initialRejectedMaterial();
    this.deliveryService.get(this.deliveryId)
    .subscribe(result=>{
      this.rejectedQuantity = result.deliveryItems
      .find(x=>x.id == this.deliveryItemId)?.rejectedQuantity;
    })
  }
  initialRejectedMaterial() {
    if(this.model.rejectedMaterials?.length == 0){
      this.addnewItem();
    }else{
      this.rejectedMaterials = this.model.rejectedMaterials;
    }
  }

  addnewItem() {
    var item = new RejectedMaterialDto();
    item.init({deliveryItemId:this.deliveryItemId });
    this.rejectedMaterials.push(item);
  }
  removeItem(index:number) {
    this.rejectedMaterials.splice(index, 1);
  }
  initialCustomer() {
    this.customerService.getForDropdown()
    .subscribe(result=>this.suppliers = result);
  }

  onSelectCustomer(item,index){

  }

  save() {
    let totalQty = 0;
    this.rejectedMaterials.map(x=>totalQty += x.rejectedQuantity);
    this.model.rejectionDate = this.rejectedMaterials[0].rejectionDate;
    if(totalQty > this.quantity){
      abp.message.error(`لا يمكن ادخال كمية اكبر من ${this.quantity}`);
    }else{
      this.model.rejectedMaterials = this.rejectedMaterials;
      this.deliveryService.rejectDelivery(this.model).subscribe((result) => {
        this.bsModalRef.hide();
      });
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
