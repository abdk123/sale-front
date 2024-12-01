import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateInvoiceDto,
  CreateInvoiceItemDto,
  CustomerServiceProxy,
  DropdownDto,
  InvoiceServiceProxy,
  MaterialDto,
  MaterialServiceProxy,
  OfferDto,
  OfferServiceProxy,
  SizeDto,
  StockDto,
  StockServiceProxy,
  SupplierOfferDto,
  SupplierOfferServiceProxy,
  UnitDto,
  UpdateOfferItemDto,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "create-invoice",
  templateUrl: "./create-invoice.component.html",
  styleUrls: ["./create-invoice.component.scss"],
})
export class CreateInvoiceComponent extends AppComponentBase implements OnInit {
  saving: boolean = false;
  invoice: CreateInvoiceDto = new CreateInvoiceDto();
  offers: OfferDto[] = [];
  selectedOffer: OfferDto = new OfferDto();
  supplierOffers: SupplierOfferDto[] = [];
  selectedSupplierOffer: SupplierOfferDto = new SupplierOfferDto();
  suppliers: DropdownDto[] = [];
  materialsIds: number[] = [];
  materials: MaterialDto[] = [];
  type = 0;
  offerType = [
    { id: 0, name: this.l("OfferToCustomer") },
    { id: 1, name: this.l("OfferFromSupplier") },
  ];
  typeIsRequired: boolean = false;
  offerIsRequired: boolean = false;
  supplierOfferIsRequired: boolean = false;

  constructor(
    injector: Injector,
    private invoiceService: InvoiceServiceProxy,
    private customerService: CustomerServiceProxy,
    private offerService: OfferServiceProxy,
    private supplierOfferService: SupplierOfferServiceProxy,
    private materialService: MaterialServiceProxy,
    private stockService: StockServiceProxy,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.invoice.invoiseDetails = [];
    this.invoice.invoiceType = 0;
    this.getOffers();
    this.initialSuppliers();
  }

  initialSuppliers() {
    this.customerService
      .getForDropdown()
      .subscribe((result) => (this.suppliers = result));
  }

  getOffers() {
    this.offerService
      .getApproved()
      .subscribe((result) => (this.offers = result));
  }

  getSupplierOffers() {
    this.supplierOfferService
      .getApproved()
      .subscribe((result) => (this.supplierOffers = result));
  }

  initialMaterials() {
    this.materialService.getAllByIds(this.materialsIds).subscribe((result) => {
      this.materials = result;
    });
  }

  getMaterialName(materialId: number) {
    return this.materials.find((x) => x.id == materialId)?.name;
  }

  getUnitName(materialId) {
    console.log(materialId);
    return this.materials.find((x) => x.id == materialId)?.unit?.name;
  }

  getStock(materialId: number) {
    var material = this.materials.find((x) => x.id == materialId);
    if (!material) return "...";

    if (material.stocks.length == -1) return "...";
    let text = "";
    let totalQuantity = 0;
    material.stocks.forEach((stock) => {
      const count =
        stock.conversionValue > 0 ? stock.quantity * stock.conversionValue : 0;
      text = count + " " + stock.size?.name + "-";
      totalQuantity += stock.quantity;
    });
    text = text.substring(0, text.length - 1);
    return `${totalQuantity} ${material.unit?.name} (${text})`;
  }

  getSaleType(addedBySmallUnit) {
    return addedBySmallUnit ? `${this.l("Size")}` : `بالطن`;
  }

  onChangeOfferType(item) {
    this.invoice.invoiceType = item.id;
    if (this.invoice.invoiceType == 1 && this.supplierOffers?.length == 0)
      this.getSupplierOffers();
    else if (this.invoice.invoiceType == 0 && this.offers?.length == 0)
      this.getOffers();
  }

  onChangeOffer(item: OfferDto) {
    this.selectedOffer = item;
    this.materialsIds = [];
    this.selectedOffer.offerItems.forEach((x) => {
      this.materialsIds.push(x.materialId);
      let invoiceItem = new CreateInvoiceItemDto();
      invoiceItem.init({
        quantity: 0,
        offerItemId: x.id,
        totalMaterilPrice: 0,
      });
      this.invoice.invoiseDetails.push(invoiceItem);
    });
    if (this.materialsIds.length > 0) {
      this.initialMaterials();
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  save() {
    this.typeIsRequired = this.invoice.invoiceType == undefined ? true : false;
    this.offerIsRequired =
      this.invoice.offerId == undefined && this.invoice.invoiceType == 0
        ? true
        : false;
    this.supplierOfferIsRequired =
      this.invoice.supplierId == undefined && this.invoice.invoiceType == 1
        ? true
        : false;
    if (
      !this.typeIsRequired &&
      !this.offerIsRequired &&
      !this.supplierOfferIsRequired
    ) {
      this.invoice.status = 1;

      this.saving = true;
      this.invoiceService
        .create(this.invoice)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((result) => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.router.navigate(["/app/orders/invoices"]);
        });
    }
  }
}
