import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEnumValue, IPageMenu } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { DeliveryDto, DeliveryServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'manage-delivery-list',
  templateUrl: './manage-delivery-list.component.html',
  styleUrls: ['./manage-delivery-list.component.scss']
})
export class ManageDeliveryListComponent extends FullPagedListingComponentBase<DeliveryDto>
implements OnInit
{
deliveries: DeliveryDto[] = [];

status: IEnumValue[] = [
  { value: 0, text: this.l("WaitingApproved") },
  { value: 1, text: this.l("Approved") },
  { value: 2, text: this.l("Shipped") },
  { value: 3, text: this.l("Delivered") },
  { value: 4, text: this.l("Rejected") },
  { value: 5, text: this.l("PartialRejected") },
];
currency: IEnumValue[] = [
  { value: 0, text: this.l("Dollar") },
  { value: 1, text: this.l("Dinar") },
];

menuItems: IPageMenu[] = [
  {
    name: "addDeliveryReport",
    label: "AddDeliveryReport",
    icon: "bi bi-journal-bookmark",
  }
];

fields = [
  {
    label: this.l("PoNumber"),
    name: "invoice",
    sortable: false,
    type: "reference",
    referenceTextField: "poNumber",
  },
  {
    label: this.l("Status"),
    name: "status",
    type: "enum",
    enumValue: this.status,
    sortable: true,
  },
  {
    label: this.l("Customer"),
    name: "customer",
    sortable: false,
    type: "reference",
    referenceTextField: "fullName",
  },
  {
    label: this.l("InvoiceNumber"),
    name: "invoice",
    sortable: true,
    type: "reference",
    referenceTextField: "id",
  },
  {
    label: this.l("DriverName"),
    name: "driverName",
    type: "string",
    sortable: true,
  },
  {
    label: this.l("DriverPhoneNumber"),
    name: "driverPhoneNumber",
    type: "string",
    sortable: true,
  },
  {
    label: this.l("VehicleNumber"),
    name: "vehicleNumber",
    type: "string",
    sortable: true,
  },
  {
    label: this.l("TransportCost"),
    name: "transportCost",
    type: "number",
    sortable: true,
  },
  {
    label: this.l("Currency"),
    name: "transportCostCurrency",
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
  this._router.navigate(["/app/orders/create-invoice"]);
}

showEditModal(id: any) {
  this._router.navigate([
    "/app/orders/edit-delivery",
    {
      deliveryId: id
    },
  ]);
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

  onSelectMenuItem(args){
    if(args.name == "addDeliveryReport"){
      this.addDeliveryReport(args.id);
    }
  }

  addDeliveryReport(id){
    this._router.navigate([
      "/app/orders/add-delivery-report",
      
      {
        deliveryId: id,
      },
    ]);
  }

  printDelivery(invoiceId){
    this._router.navigate([
      "/app/orders/print-delivery",
      {
        invoiceId: invoiceId,
      },
    ]);
  }
}
