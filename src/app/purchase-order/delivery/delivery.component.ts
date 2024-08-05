import { Component, Injector, OnInit } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import {
  IEnumValue,
  IPageMenu,
} from "@app/layout/content-template/page-default/page-field";
import { FullPagedListingComponentBase } from "@shared/full-paged-listing-component-base";
import {
  CreateDeliveryItemDto,
  DeliveryDto,
  DeliveryServiceProxy,
  FullPagedRequestDto,
  InvoiceDto,
  InvoiceServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "delivery",
  templateUrl: "./delivery.component.html",
})
export class DeliveryComponent
  extends FullPagedListingComponentBase<InvoiceDto>
  implements OnInit
{
  invoices: InvoiceDto[] = [];
  deliveryPrinted: DeliveryDto = new DeliveryDto();
  deliveryItemsPrinted: CreateDeliveryItemDto[] = [];

  status: IEnumValue[] = [
    { value: 0, text: this.l("NotPriced") },
    { value: 1, text: this.l("PendingReceived") },
    { value: 2, text: this.l("PartialRecieved") },
    { value: 3, text: this.l("Received") },
  ];
  currency: IEnumValue[] = [
    { value: 0, text: this.l("Dollar") },
    { value: 1, text: this.l("Dinar") },
  ];

  menuItems: IPageMenu[] = [
    {
      name: "sendDelivery",
      label: "SendDelivery",
      icon: "bi bi-truck",
    },
  ];

  fields = [
    {
      label: this.l("PoNumber"),
      name: "poNumber",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("Status"),
      name: "status",
      type: "enum",
      enumValue: this.status,
      sortable: true,
    },
    {
      label: this.l("Supplier"),
      name: "supplierName",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("InvoiceNumber"),
      name: "id",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("Currency"),
      name: "currency",
      type: "enum",
      enumValue: this.currency,
      sortable: true,
    },
  ];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _router: Router,
    private invoiceService: InvoiceServiceProxy,
    private deliveryService: DeliveryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "";
    this.invoiceService.read(request).subscribe((result) => {
      this.invoices = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    this._router.navigate(["/app/orders/create-invoice"]);
  }

  showEditModal(id: any) {
    var orderId = this.invoices.find((x) => x.id == id)?.offerId;
    this._router.navigate([
      "/app/orders/edit-delivery",
      {
        invoiceId: id,
        offerId: orderId,
      },
    ]);
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("InvoiceDeleteWarningMessage", "Invoices"),
      undefined,
      (result: boolean) => {
        if (result) {
          this.invoiceService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {}

  showFilterDialog(status) {}

  onSelectMenuItem(args) {
    if (args.name == "sendDelivery") {
      this.addOrEditDelivery(args.id);
    } else if (args.name == "printDelivery") {
      // this.viewPrintPage(args.id);
    }
  }

  addOrEditDelivery(invoiceId) {
    this._router.navigate([
      "/app/orders/send-delivery",

      {
        invoiceId: invoiceId,
      },
    ]);
  }
}
