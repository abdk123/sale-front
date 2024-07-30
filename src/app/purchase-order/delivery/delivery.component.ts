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
    { value: 0, text: this.l("Shipped") },
    { value: 1, text: this.l("Delivered") },
    { value: 2, text: this.l("Returend") },
    { value: 3, text: this.l("PartialReturned") },
  ];
  currency: IEnumValue[] = [
    { value: 0, text: this.l("Dollar") },
    { value: 1, text: this.l("Dinar") },
  ];

  menuItems: IPageMenu[] = [
    {
      name: "AddDeliveryReport",
      label: "AddDeliveryReport",
      icon: "simple-icon-settings",
    },
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
      label: this.l("customer"),
      name: "customerId",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("PoNumber"),
      name: "poNumber",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("GRCode"),
      name: "grCode",
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
      label: this.l("DriverName"),
      name: "driverName",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("DriverPhoneNumber"),
      name: "driverPhoneNumber",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("VehicleNumber"),
      name: "vehicleNumber",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("TransportedQuantity"),
      name: "transportedQuantity",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("Currency"),
      name: "transportCostCurrency",
      type: "enum",
      enumValue: this.currency,
      sortable: true,
    },
    {
      label: this.l("TransportCost"),
      name: "transportCost",
      type: "number",
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

