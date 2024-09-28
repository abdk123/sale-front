import { Component, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IEnumValue } from '@app/layout/content-template/page-default/page-field';
import { AppComponentBase } from '@shared/app-component-base';
import { SaleInvoiceDto, SaleInvoiceServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-sale-invoice',
  templateUrl: './view-sale-invoice.component.html',
  styleUrls: ['./view-sale-invoice.component.scss']
})
export class ViewSaleInvoiceComponent extends AppComponentBase implements OnChanges {
  @Input() offerItemsIds: number[] = [];
  invoices: SaleInvoiceDto[] = [];

  status: IEnumValue[] = [
    { value: 0, text: this.l("UnpaidSalesInvoice") },
    { value: 1, text: this.l("Paid") },
    { value: 2, text: this.l("DelayInPaid") },
  ];

  currency: IEnumValue[] = [
    { value: 1, text: this.l("Dollar") },
    { value: 0, text: this.l("Dinar") },
  ];
  
  constructor(injector: Injector, private saleInvoiceServiceProxy: SaleInvoiceServiceProxy) {
    super(injector);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.offerItemsIds?.length > 0) {
      this.initialSaleInvoices();
    }
  }

  initialSaleInvoices() {
    this.saleInvoiceServiceProxy.getByOfferItems(this.offerItemsIds)
    .subscribe(result=>{
      this.invoices = result;
    });
  }

  getStatus(value){
    return this.status.find(x=>x.value == value)?.text;
  }

  getCurrency(value){
    return this.currency.find(x=>x.value == value)?.text;
  }

}
