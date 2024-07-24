import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEnumValue } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FullPagedRequestDto, OfferDto, OfferServiceProxy } from '@shared/service-proxies/service-proxies';
import { environment } from 'environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: "offer",
  templateUrl: "./offer.component.html",
  styleUrls: ["./offer.component.scss"],
})
export class OfferComponent
  extends FullPagedListingComponentBase<OfferDto>
  implements OnInit
{
  offers: OfferDto[] = [];
  status: IEnumValue[] = [
    { value: 0, text: this.l("Pending") },
    { value: 1, text: this.l("Approved") },
    { value: 2, text: this.l("TransformToPurchaseInvoice") },
    { value: 3, text: this.l("Canceled") },
    { value: 4, text: this.l("Expired") },
  ];
  currency: IEnumValue[] = [
    { value: 0, text: this.l("Dollar") },
    { value: 1, text: this.l("Dinar") },
  ];
  fields = [
    {
      label: this.l("Customer"),
      name: "customer",
      sortable: true,
      type: "reference",
      referenceTextField: "fullName",
    },
    {
      label: this.l("OfferNumber"),
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
      label: this.l("TotalPrice"),
      name: "totalPrice",
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
      label: this.l("Status"),
      name: "status",
      type: "enum",
      enumValue: this.status,
      sortable: true,
    },
    {
      label: this.l("OfferDate"),
      name: "creationTime",
      sortable: false,
      type: "date",
      format: "yyyy-MM-dd",
    },
    {
      label: this.l("OfferEndDate"),
      name: "offerEndDate",
      sortable: false,
      type: "date",
      format: "yyyy-MM-dd",
    },
    {
      label: this.l("PoNumber"),
      name: "porchaseOrderId",
      sortable: true,
      type: "string",
    },
  ];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
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
    request.including = "Customer,OfferItems";
    this.offerService.read(request).subscribe((result) => {
      this.offers = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    this._router.navigate(["/app/orders/create-offer"]);
  }

  showEditModal(id: any) {
    this._router.navigate([
      "/app/orders/update-offer",
      {
        id: id,
      },
    ]);
  }

  deleteItem(id: number): void {
    abp.message.confirm(
      this.l("OfferDeleteWarningMessage", "Offers"),
      undefined,
      (result: boolean) => {
        if (result) {
          this.offerService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  viewPrintPage(id: number){
    this._router.navigate([
      "/app/orders/print-offer",
      {
        id: id,
      },
    ]);
    
  }

  showViewModal(id: number) {}

  showFilterDialog(status) {}
}

