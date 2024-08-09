import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEnumValue } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { DeliveryDto, DeliveryServiceProxy, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "rejected-deliveries",
  templateUrl: "./rejected-deliveries.component.html",
  styleUrls: ["./rejected-deliveries.component.scss"],
})

export class RejectedDeliveriesComponent
  extends FullPagedListingComponentBase<DeliveryDto>
  implements OnInit
{
  returnedDeliveries: DeliveryDto[] = [];
  currency: IEnumValue[] = [
    { value: 0, text: this.l("Dollar") },
    { value: 1, text: this.l("Dinar") },
  ];
  fields = [
    {
      label: this.l("Customer"),
      name: "customer",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("InvoiceNumber"),
      name: "invoiceNumber",
      sortable: true,
      type: "number",
    },
    {
      label: this.l("PoNumber"),
      name: "poNumber",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("Number"),
      name: "id",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("RejectDate"),
      name: "rejectDate",
      sortable: false,
      type: "date",
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
