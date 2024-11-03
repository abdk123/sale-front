import { Component, Injector, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  InvoiceDto,
  InvoiceServiceProxy,
  CreateReceivingDto,
  ReceivingServiceProxy,
  CreateReceivingItemDto,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "create-receive",
  templateUrl: "./create-receive.component.html",
  styleUrls: ["./create-receive.component.scss"],
})
export class CreateReceiveComponent extends AppComponentBase implements OnInit {
  invoice: InvoiceDto = new InvoiceDto();
  receiveDto: CreateReceivingDto = new CreateReceivingDto();
  invoiceId: number;
  saving: boolean;
  date: Date = new Date();
  constructor(
    injector: Injector,
    private router: Router,
    private invoiceService: InvoiceServiceProxy,
    private receivingService: ReceivingServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot?.params?.invoiceId;
    this.initialInvoice();
  }

  initialInvoice() {
    this.invoiceService.getWithDetail(this.invoiceId).subscribe((result) => {
      this.invoice = result;
    });
  }

  save() {
    const invalidMaterial = this.checkEnteredQuantities();
    if(invalidMaterial == ''){
      this.receiveDto.creationTime = this.date.toISOString();
      this.receiveDto.invoiceId = this.invoiceId;
      this.saving = true;
      this.receivingService
        .create(this.receiveDto)
        .pipe(
          finalize(() => {
            this.saving = false;
            this.notify.info(this.l("SavedSuccessfully"));
            this.router.navigate(["/app/orders/receives"]);
          })
        )
        .subscribe((result) => {});
    }else{
      const title = `المادة ${invalidMaterial}`;
      const message = `القيمة المدخلة يجب ان تكون اصغر او تساوي القيمة المتبقية`;
      this.showErrorMessage(message,title);
    }
  }

  onUpdateReceiveItem(item: CreateReceivingItemDto){
    var index = this.receiveDto.receivingItems.findIndex(x=>x.invoiceItemId == item.invoiceItemId);
    if(index > -1){
      this.receiveDto.receivingItems.splice(index,1);
    }
    // let item = new CreateReceivingItemDto();
    // item.init({invoiceItemId:args.invoiceItemId,receivedQuantity:args.receivedQuantity});
    this.receiveDto.receivingItems.push(item);
  }

  checkEnteredQuantities(){
    var invalidMaterial = '';
    var invoiceItems = this.invoice.invoiseDetails;
    this.receiveDto.receivingItems.forEach(item=>{
      var invoiceItem = invoiceItems.find(x=>x.id == item.invoiceItemId);
      if(invoiceItem){
        var notReceivedQuantity = invoiceItem.quantity - invoiceItem.receivedQuantity;
        if(item.receivedQuantity > notReceivedQuantity){
          invalidMaterial = invoiceItem?.offerItem?.material?.name;
        }
      }
    });
    return invalidMaterial;
  }
  
  showErrorMessage(message, title){
    abp.message.warn(
      message,title
    );
  }
}
