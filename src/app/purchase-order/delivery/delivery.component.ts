import { Component, Injector, OnInit, reflectComponentType } from "@angular/core";
import { Router } from "@angular/router";
import {
  IEnumValue,
  IPageMenu,
} from "@app/layout/content-template/page-default/page-field";
import { FullPagedListingComponentBase } from "@shared/full-paged-listing-component-base";
import {
  CreateDeliveryItemDto,
  CustomerDto,
  CustomerServiceProxy,
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
  extends FullPagedListingComponentBase<CustomerDto>
  implements OnInit
{
  customers: CustomerDto[] = [];
  deliveryPrinted: CustomerDto = new CustomerDto();
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
      label: this.l("FullName"),
      name: "fullName",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("PhoneNumber"),
      name: "phoneNumber",
      sortable: true,
      type: "string",
    },
    {
      label: this.l("Address"),
      name: "address",
      sortable: true,
      type: "string",
    }
  ];

  constructor(
    injector: Injector,
    private _router: Router,
    private customerService: CustomerServiceProxy,
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
    this.customerService.read(request).subscribe((result) => {
      this.customers = result.items;
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

  addOrEditDelivery(customerId) {
    this._router.navigate([
      "/app/orders/send-delivery",

      {
        customerId: customerId,
      },
    ]);
  }
}
