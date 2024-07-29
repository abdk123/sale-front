import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEnumValue, IPageMenu } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { DeliveryDto, DeliveryServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "delivery",
  templateUrl: "./delivery.component.html",
})
export class DeliveryComponent
  extends FullPagedListingComponentBase<DeliveryDto>
  implements OnInit
{
  deliveries: DeliveryDto[] = [];
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
      name: "receive",
      label: "Receive",
      icon: "simple-icon-settings",
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
      label: this.l("DeliveryNumber"),
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
      label: this.l("NotReceivedQuantity"),
      name: "totalNotReceivedQuantity",
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
    this.deliveryService.read(request).subscribe((result) => {
      this.deliveries = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    this._router.navigate(["/app/orders/create-delivery"]);
  }

  showEditModal(id: any) {
    // var orderId = this.deliverys.find((x) => x.id == id);
    // this._router.navigate([
    //   "/app/orders/edit-delivery",
    //   {
    //     deliveryId: id,
    //     offerId: orderId,
    //   },
    // ]);
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("DeliveryDeleteWarningMessage", "Deliveries"),
      undefined,
      (result: boolean) => {
        if (result) {
          this.deliveryService.delete(id).subscribe(() => {
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
    if (args.name == "receive") {
      this.addOrEditReceive(args.id);
    }
  }

  addOrEditReceive(deliveryId) {}
}

