import { AppComponentBase } from '@shared/app-component-base';
import { Component,Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownDto, UpdateOfferDto, CustomerServiceProxy, OfferServiceProxy, UpdateOfferItemDto, InvoiceDto, InvoiceServiceProxy, InvoiceItemDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: "edit-invoice",
  templateUrl: "./edit-invoice.component.html",
  styleUrls: ["./edit-invoice.component.scss"],
})
export class EditInvoiceComponent extends AppComponentBase implements OnInit {
  offer: UpdateOfferDto = new UpdateOfferDto();
  invoice: InvoiceDto = new InvoiceDto();
  saving = false;
  offerId: number;
  invoiceId: number;
  customerIsRequired = false;
  currencyIsRequired = false;
  statusIsRequired = false;
  showPorchaseOrder = false;
  customers: DropdownDto[] = [];
  itemIndex: number;
  endDate: Date;
  currencies = [
    { id: 1, name: this.l("Dollar") },
    { id: 0, name: this.l("Dinar") },
  ];
  status = [
    { id: 0, name: this.l("WaitingApprove") },
    { id: 1, name: this.l("Approved") },
  ];
  constructor(
    injector: Injector,
    private router: Router,
    private customerService: CustomerServiceProxy,
    private offerService: OfferServiceProxy,
    private invoiceService: InvoiceServiceProxy,
    
    private route: ActivatedRoute
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.offerId = this.route.snapshot?.params?.offerId;
    this.invoiceId = this.route.snapshot?.params?.invoiceId;
    this.initialOffer();
    this.initialCustomers();
  }

  initialOffer() {
    this.offerService
      .getForEdit(this.offerId)
      .subscribe((result: UpdateOfferDto) => {
        this.offer = result;
        this.endDate = this.getDateFromString(this.offer.offerEndDate);
        this.initialInvoice();
      });
  }

  initialInvoice(){
    // this.invoiceService.getByOfferId(this.offerId)
    // .subscribe(result=>{
      
    //   this.invoice = result;
    // });
    this.invoice.id = this.invoiceId;
    this.invoice.offerId = this.offerId;
  }

  initialCustomers() {
    this.customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
    });
  }

  onChangeStatus(status) {
    if (status?.id == 1) {
      this.showPorchaseOrder = true;
    } else {
      this.showPorchaseOrder = false;
      this.offer.porchaseOrderId = "";
    }
  }

  save() {
    this.customerIsRequired = this.offer.customerId ? false : true;
    this.statusIsRequired = this.offer.status == undefined ? true : false;
    this.currencyIsRequired = this.offer.currency == undefined ? true : false;
    if (
      !this.customerIsRequired &&
      !this.statusIsRequired &&
      !this.currencyIsRequired
    ) {
      if (!this.offer.offerItems) {
        abp.message.warn(this.l("PleaseAddAtLeastOneMaterial"));
      }
      if (!this.offer.porchaseOrderId && this.offer.status == 1) {
        abp.message.warn(this.l("PoNumberIsRequired"));
      }
      this.saving = true;
      this.offer.offerEndDate = this.endDate.toISOString();
      this.offerService
        .update(this.offer)
        .pipe(
          finalize(() => {
            this.saving = false;
            this.notify.info(this.l("SavedSuccessfully"));
            this.router.navigate(["/app/orders/invoices"]);
          })
        )
        .subscribe((result) => {});
    }
  }

  saveInvoiceDetail(){
    if(!this.invoice.invoiseDetails){
      return;
    }
    if(this.invoice.invoiseDetails?.length == 0 || this.invoice.invoiseDetails.some(x=>x.quantity == 0)){
      abp.message.error(this.l("الكمية المدخلة يجب ان تكون اكبر من صفر"));
      return;
    }else if(this.invoice.invoiseDetails && this.invoice.invoiseDetails.some(x=>x.quantity > x.offerItem.quantity)){
      abp.message.error(this.l("الكمية المدخلة يجب ان تكون اصغر او تساوي الكمية المدخلة في العرض "));
    }else if(this.invoice.invoiseDetails.some(x=>x.totalMaterilPrice == 0)){
      abp.message.error(this.l("السعر يجب ان يكون اكبر من صفر"));
    }else{
      this.invoiceService.saveInvoiceDetail(this.invoice)
      .subscribe((result)=>{
        this.notify.info(this.l("SavedSuccessfully"));
        this.router.navigate(["/app/orders/invoices"]);
      });
    }
    
  }

  onSaveOfferItem(items: UpdateOfferItemDto[]) {
    this.offer.offerItems = items;
  }

  onSaveInvoiceItem(args: InvoiceItemDto[]){
    this.invoice.invoiseDetails = args;
  }

  
}

