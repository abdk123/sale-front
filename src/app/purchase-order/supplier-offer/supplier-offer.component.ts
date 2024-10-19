import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IEnumValue, IPageMenu } from "@app/layout/content-template/page-default/page-field";
import { FullPagedListingComponentBase } from "@shared/full-paged-listing-component-base";
import {
  FullPagedRequestDto,
  SupplierOfferDto,
  SupplierOfferServiceProxy,
  UpdateSupplierOfferItemDto,
} from "@shared/service-proxies/service-proxies";
import { environment } from "environments/environment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "offer-supplier",
  templateUrl: "./supplier-offer.component.html",
  styleUrls: ["./supplier-offer.component.scss"],
})
export class SupplierOfferComponent
  extends FullPagedListingComponentBase<SupplierOfferDto>
  implements OnInit
{
  supplierOffers: SupplierOfferDto[] = [];
  supplierOfferItemsPrinted: UpdateSupplierOfferItemDto[] = [];
  status: IEnumValue[] = [
    { value: 0, text: this.l("Pending") },
    { value: 1, text: this.l("Approved") },
    { value: 2, text: this.l("TransformToPurchaseInvoice") },
    { value: 3, text: this.l("Canceled") },
    { value: 4, text: this.l("Expired") },
  ];
  currency: IEnumValue[] = [
    { value: 0, text: this.l("Dinar") },
    { value: 1, text: this.l("Dollar") },
    
  ];
  menuItems: IPageMenu[] = [
    {
      name:'manageOffer',
      label:'ManageOffer',
      icon:'simple-icon-settings',
    }
  ]
  fields = [
    {
      label: this.l("Supplier"),
      name: "supplier",
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
      name: "supplierOfferEndDate",
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
    private supplierOfferService: SupplierOfferServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "Supplier,SupplierOfferItems";
    this.supplierOfferService.read(request).subscribe((result) => {
      this.supplierOffers = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  showAddNewModal() {
    this._router.navigate(["/app/orders/create-supplier-offer"]);
  }

  showEditModal(id: any) {
    this._router.navigate([
      "/app/orders/update-supplier-Offer",
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
          this.supplierOfferService.delete(id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  showViewModal(id: number) {
    this._router.navigate([
      "/app/orders/summary",
      {
        id: id,
      },
    ]);
  }

  showFilterDialog(status) {}

  onSelectMenuItem(args){
    if(args.name == "manageOffer"){
      this.mangeSupplierOffer(args.id);
    }
  }

  mangeSupplierOffer(id: any) {
    this._router.navigate([
      "/app/orders/manage-supplierOffer",
      {
        id: id,
      },
    ]);
  }
}
