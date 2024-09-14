import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEnumValue } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { DeliveryDto, DeliveryServiceProxy, FullPagedRequestDto, RejectDeliveryItemDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "rejected-deliveries",
  templateUrl: "./rejected-deliveries.component.html",
  styleUrls: ["./rejected-deliveries.component.scss"],
})

export class RejectedDeliveriesComponent
  extends FullPagedListingComponentBase<RejectDeliveryItemDto>
  implements OnInit
{
  returnedDeliveries: RejectDeliveryItemDto[] = [];
  currency: IEnumValue[] = [
    { value: 1, text: this.l("Dollar") },
    { value: 0, text: this.l("Dinar") },
  ];
  fields = [
    {
      label: this.l("Material"),
      name: "materialName",
      sortable: false,
      type: "string",
    },
    {
      label: this.l("PoNumber"),
      name: "poNumber",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("UnitName"),
      name: "unitName",
      sortable: false,
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
      label: this.l("Status"),
      name: "status",
      type: "enum",
      enumValue: this.currency,
      sortable: true,
    },
  ];

  status: IEnumValue[] = [
    { value: 0, text: this.l("Pending") },
    { value: 1, text: this.l("Approved") },
    { value: 2, text: this.l("RejectAndReturnToSupplier") },
    { value: 3, text: this.l("RejectAndRecordAsDamaged") },
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
