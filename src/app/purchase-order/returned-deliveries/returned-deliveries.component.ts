import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEnumValue, IPageMenu } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { DeliveryDto, CreateDeliveryItemDto, InvoiceServiceProxy, DeliveryServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "returned-deliveries",
  templateUrl: "./returned-deliveries.component.html",
  styleUrls: ["./returned-deliveries.component.scss"],
})
export class ReturnedDeliveriesComponent
  extends FullPagedListingComponentBase<DeliveryDto>
  implements OnInit
{
  returnedDeliveries: DeliveryDto[] = [];
  status: IEnumValue[] = [{ value: 0, text: this.l("Returned") }];

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
      label: this.l("Quantity"),
      name: "quantity",
      sortable: false,
      type: "string",
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
      sortable: false,
      type: "number",
    },
    {
      label: this.l("Note"),
      name: "note",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("OfferDate"),
      name: "offerDate",
      sortable: false,
      type: "date",
    },
    {
      label: this.l("PoNumber"),
      name: "poNumber",
      sortable: false,
      type: "number",
    },
  ];

  constructor(
    injector: Injector,
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
  ): void {}

  showViewModal(id: number) {}

  showFilterDialog(status) {}
}
