import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEnumValue, IPageMenu } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FullPagedRequestDto, InvoiceDto, InvoiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'monitor-purchase-order',
  templateUrl: './monitor-purchase-order.component.html',
  styleUrls: ['./monitor-purchase-order.component.scss']
})
export class MonitorPurchaseOrderComponent
extends FullPagedListingComponentBase<InvoiceDto>
implements OnInit
{
  invoices: InvoiceDto[] = [];
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

  fields = [
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
      label: this.l("TotalQuantity"),
      name: "totalQuantity",
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
    {
      label: this.l("TotalPrice"),
      name: "totalPrice",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("OfferDate"),
      name: "creationTime",
      sortable: false,
      type: "date",
      format: "yyyy-MM-dd",
    },
    {
      label: this.l("PoNumber"),
      name: "poNumber",
      sortable: false,
      type: "string",
    },
  ];

  menuItems: IPageMenu[] = [
    {
      name: "sendDelivery",
      label: "SendDelivery",
      icon: "simple-icon-settings",
    },
  ];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _router: Router,
    private invoiceService: InvoiceServiceProxy,
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
      "/app/orders/edit-invoice",
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
      this.sendDelivery(args.id);
    }
  }

  sendDelivery(invoiceId) {
    this._router.navigate([
      "/app/orders/send-delivery",
      {
        invoiceId: invoiceId,
      },
    ]);
  }
}

