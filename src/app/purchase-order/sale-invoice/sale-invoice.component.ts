import { Component, Injector, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { IEnumValue, IPageMenu } from '@app/layout/content-template/page-default/page-field';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { CreateSaleInvoiceItemDto, FullPagedRequestDto, SaleInvoiceDto, SaleInvoiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: "sale-invoice",
  templateUrl: "./sale-invoice.component.html",
})
export class SaleInvoiceComponent
  extends FullPagedListingComponentBase<SaleInvoiceDto>
  implements OnInit
{
  saleInvoices: SaleInvoiceDto[] = [];
  saleInvoicePrinted: SaleInvoiceDto = new SaleInvoiceDto();

  status: IEnumValue[] = [{ value: 0, text: this.l("UnpaidSalesInvoice") }];
  paidType: IEnumValue[] = [
    { value: 0, text: this.l("NotPaid") },
    { value: 1, text: this.l("Paid") },
  ];
  currency: IEnumValue[] = [
    { value: 0, text: this.l("Dollar") },
    { value: 1, text: this.l("Dinar") },
  ];

  menuItems: IPageMenu[] = [
    {
      name: "printSaleInvoice",
      label: "PrintSaleInvoice",
      icon: "bi bi-printer",
    },
    {
      name: "Pdf+Urn",
      label: "Pdf+Urn",
      icon: "bi bi-printer",
    },
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
      label: this.l("InvoiceNumber"),
      name: "id",
      type: "number",
      sortable: true,
    },
    {
      label: this.l("TotalQuantity"),
      name: "invoiceTotalQuantity",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("TotalPrice"),
      name: "saeltotalPrice",
      sortable: false,
      type: "number",
    },
    {
      label: this.l("Notes"),
      name: "note",
      type: "string",
      sortable: false,
    },
    {
      label: this.l("Status"),
      name: "status",
      type: "enum",
      enumValue: this.status,
      sortable: false,
    },
    {
      label: this.l("InvoiceDate"),
      name: "creationTime",
      type: "date",
      sortable: false,
      format: "yyyy-MM-dd",
    },
    {
      label: this.l("DateForPaid"),
      name: "dateForPaid",
      type: "date",
      sortable: false,
      format: "yyyy-MM-dd",
    },
    {
      label: this.l("DaysForPaid"),
      name: "daysForPaid",
      type: "number",
      sortable: true,
    },
    {
      label: this.l("RemainingDaysForPaid"),
      name: "remainingDaysForPaid",
      type: "number",
      sortable: true,
    },
    {
      label: this.l("PaidType"),
      name: "paidType",
      type: "enum",
      enumValue: this.paidType,
      sortable: false,
    },
    {
      label: this.l("PillURN"),
      name: "pillURN",
      type: "string",
      sortable: true,
    },
  ];

  constructor(
    injector: Injector,
    private _modalService: BsModalService,
    private _router: Router,
    private invoiceService: SaleInvoiceServiceProxy,
    private saleInvoiceService: SaleInvoiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  protected list(
    request: FullPagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.including = "customer,saleInvoiceItems";
    this.saleInvoiceService.read(request).subscribe((result) => {
      this.saleInvoices = result.items;
      this.showPaging(result, pageNumber);
    });
  }

  viewPrintPage(id: number) {
    this.saleInvoiceService.getWithDetailsById(id).subscribe((result) => {
      this.saleInvoicePrinted = result;
      const url = this._router.serializeUrl(
        this._router.createUrlTree(
          ["/print-saleInvoice"],
          new UrlTree(undefined, [JSON.stringify(this.saleInvoicePrinted)])
        )
      );
      window.open(url, "_blank");
    });
  }

  showViewModal(id: number) {}

  showFilterDialog(status) {}

  onSelectMenuItem(args) {
    if (args.name == "printSaleInvoice") {
      this.viewPrintPage(args.id);
    } else if (args.name === "Pdf+Urn") {
      this.viewPdfAndUrnPage(args.id);
    }
  }

  viewPdfAndUrnPage(id: number){
    this._router.navigate([
      "/app/orders/pdf-urn",
      {
        id: id,
      },
    ]);
  }
}
