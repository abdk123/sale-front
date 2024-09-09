import { Component, Injector, OnInit, reflectComponentType } from "@angular/core";
import { Router } from "@angular/router";
import {
  IEnumValue,
  IPageMenu,
} from "@app/layout/content-template/page-default/page-field";
import { FullPagedListingComponentBase } from "@shared/full-paged-listing-component-base";
import {
  CreateDeliveryItemDto,
  DeliveryDto,
  FullPagedRequestDto,
  OfferDto,
  OfferServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "delivery",
  templateUrl: "./delivery.component.html",
})
export class DeliveryComponent
  extends FullPagedListingComponentBase<OfferDto>
  implements OnInit
{
  offers: OfferDto[] = [];
  deliveryPrinted: DeliveryDto = new DeliveryDto();
  deliveryItemsPrinted: CreateDeliveryItemDto[] = [];

  status: IEnumValue[] = [
    { value: 0, text: this.l("NotPriced") },
    { value: 1, text: this.l("PendingReceived") },
    { value: 2, text: this.l("PartialRecieved") },
    { value: 3, text: this.l("Received") },
  ];
  currency: IEnumValue[] = [
    { value: 1, text: this.l("Dollar") },
    { value: 0, text: this.l("Dinar") },
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
      label: this.l("Customer"),
      name: "customer",
      sortable: false,
      type: "reference",
      referenceTextField:'fullName'
    },
    {
      label: this.l("PoNumber"),
      name: "porchaseOrderId",
      sortable: false,
      type: "string",
    },
    // {
    //   label: this.l("Status"),
    //   name: "status",
    //   type: "enum",
    //   enumValue: this.status,
    //   sortable: true,
    // },
    {
      label: this.l("OfferNumber"),
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
    private _router: Router,
    private offerService: OfferServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "Customer";
    this.offerService.read(request).subscribe((result) => {
      this.offers = result.items;
      this.showPaging(result, pageNumber);
    });
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

  addOrEditDelivery(offerId) {
    this._router.navigate([
      "/app/orders/send-delivery",

      {
        offerId: offerId,
      },
    ]);
  }
}
