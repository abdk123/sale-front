import { Router } from "@angular/router";
import {
  CreateSaleInvoiceDto,
  CreateSaleInvoiceItemDto,
  SaleInvoiceServiceProxy,
} from "./../../../../shared/service-proxies/service-proxies";
import { Component, Injector } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CustomerServiceProxy,
  DeliveryDto,
  DeliveryServiceProxy,
  DropdownDto,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";
import { DatePipe } from "@angular/common";

@Component({
  selector: "convert-sale-invoice",
  templateUrl: "./convert-sale-invoice.component.html",
  styleUrls: ["./convert-sale-invoice.component.scss"],
})
export class ConvertSaleInvoiceComponent extends AppComponentBase {
  saving: boolean = false;
  deliveries: DeliveryDto[] = [];
  selectedDeliveries: DeliveryDto[] = [];
  customers: DropdownDto[] = [];
  customerId: number;
  daysForPaid: number;
  saleInvoice: CreateSaleInvoiceDto = new CreateSaleInvoiceDto();

  constructor(
    injector: Injector,
    private _deliveryService: DeliveryServiceProxy,
    private _customerService: CustomerServiceProxy,
    private _saleInvoiceService: SaleInvoiceServiceProxy,
    private _router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialCustomers();
  }

  initialDeliveries() {
    this._deliveryService
      .getAllByCustomerId(this.customerId)
      .subscribe((result: DeliveryDto[]) => {
        this.deliveries = result;
      });
  }

  initialCustomers() {
    this._customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
      if(this.customers?.length > 0){
        this.customerId = this.customers[0].id;
        this.initialDeliveries();
      }
    });
  }

  onChange(){
    this.initialDeliveries();
  }

  onCheck(args,delivery: DeliveryDto) {
    var checked = args.target.value;
    const index = this.selectedDeliveries.findIndex((x) => x.id === delivery.id);
    if(checked){
      if (index == -1) {
        this.selectedDeliveries.push(delivery);
      } 
    }else{
      this.selectedDeliveries.splice(index, 1);

    }
    
  }

  async save() {
    if (this.customerId === undefined || this.selectedDeliveries.length === 0) {
      abp.message.warn(this.l("PleaseSelectCustomerAndDaysAndDeliveries"));
    } else {
      this.saleInvoice.saleInvoiceItems = [];
      this.saleInvoice.customerId = this.customerId;
      this.saleInvoice.daysForPaid = this.daysForPaid;

      this.selectedDeliveries.forEach((delivery) => {
        delivery.deliveryItems.forEach((item) => {
          var saleInvoiceItem = new CreateSaleInvoiceItemDto();
          saleInvoiceItem.totalQuantity = item.approvedQuantity;
          saleInvoiceItem.totalItemPrice = item.totalPrice;
          saleInvoiceItem.deliveryItemId = item.id;

          this.saleInvoice.saleInvoiceItems.push(saleInvoiceItem);
        });
      });

      await this._saleInvoiceService
        .create(this.saleInvoice)
        .pipe(
          finalize(() => {
            this.saving = false;
            this.notify.info(this.l("SavedSuccessfully"));
            this._router.navigate(["/app/orders/sale-invoices"]);
          })
        )
        .subscribe((result) => {});
    }
  }
}
