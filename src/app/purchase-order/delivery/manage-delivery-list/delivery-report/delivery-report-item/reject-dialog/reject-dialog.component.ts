import { Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  DeliveryServiceProxy,
  RejectDeliveryDto,
  RejectDeliveryServiceProxy,
} from "@shared/service-proxies/service-proxies";
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
  quantity: number;
  deliveryItemId: number;
  deliveryId: number;
  rejectedQuantity: number;
  rejectionDate: Date = new Date();
  constructor(
    injector: Injector,
    private deliveryService: DeliveryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.deliveryService.get(this.deliveryId)
    .subscribe(result=>{
      this.rejectedQuantity = result.deliveryItems
      .find(x=>x.id == this.deliveryItemId)?.rejectedQuantity;
    })
  }

  reject(returnToSupplier: boolean) {
    if(this.rejectedQuantity > this.quantity){
      abp.message.error(`لا يمكن ادخال كمية اكبر من ${this.quantity}`);
    }else{
      this.model.deliveryId = this.deliveryId;
      this.model.deliveryItemId = this.deliveryItemId;
      this.model.returnToSupplier = returnToSupplier;
      this.model.rejectedQuantity = this.rejectedQuantity;
      this.deliveryService.rejectDelivery(this.model).subscribe((result) => {
        this.bsModalRef.hide();
      });
    }
  }
}
