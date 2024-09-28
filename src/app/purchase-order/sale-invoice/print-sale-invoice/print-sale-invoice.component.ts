import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { SaleInvoiceDto, UpdateSaleInvoiceItemDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: "print-sale-invoice",
  templateUrl: "./print-sale-invoice.component.html",
  styleUrls: ["./print-sale-invoice.component.scss"],
})
export class PrintSaleInvoiceComponent extends AppComponentBase {
  saleInvoice: SaleInvoiceDto = new SaleInvoiceDto();
  saleInvoiceItems: UpdateSaleInvoiceItemDto[] = [];

  constructor(injector: Injector, private _route: ActivatedRoute) {
    super(injector);
    this._route.queryParams;
    this._route.queryParams.subscribe((x) => {
      this.saleInvoice = JSON.parse(x[0]);
      this.saleInvoiceItems = this.saleInvoice.saleInvoiceItems;
      setTimeout(() => {
        print();
      }, 1000);
    });
  }

  // ngOnInit(): void {
  //   this._route.queryParams;
  //   this._route.queryParams.subscribe((x) => {
  //     this.saleInvoice = JSON.parse(x[0]);
  //     this.saleInvoiceItems = this.saleInvoice.saleInvoiceItems;
  //   });
  // }

  Calculate(q, up) {
    return q * up;
  }

  calculateTotalQuantity() {
    const totalQuantity = this.saleInvoiceItems.reduce(
      (sum, item) => sum + item.totalQuantity,
      0
    );
    return totalQuantity;
  }

  calculateTotalPrice() {
    const totalPrice = this.saleInvoiceItems.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0
    );
    return totalPrice;
  }

  getUnitName(item){
    if(item?.deliveryItem?.offerItem?.unitName)
      return item?.deliveryItem?.offerItem?.unitName;

    if(item?.deliveryItem?.offerItem?.unit?.name)
      return item?.deliveryItem?.offerItem?.unit?.name;

    return item?.deliveryItem?.offerItem?.size?.name;

  }

  getMaterialName(item){
    if(item?.deliveryItem?.offerItem?.materialName)
      return item?.deliveryItem?.offerItem?.materialName;

    return item?.deliveryItem?.offerItem?.material?.name;
  }
}