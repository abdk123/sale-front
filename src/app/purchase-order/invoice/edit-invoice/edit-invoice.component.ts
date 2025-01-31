import { AppComponentBase } from "@shared/app-component-base";
import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  DropdownDto,
  CustomerServiceProxy,
  OfferServiceProxy,
  UpdateOfferItemDto,
  InvoiceServiceProxy,
  UpdateInvoiceDto,
  OfferDto,
  SupplierOfferDto,
  MaterialDto,
  SupplierOfferServiceProxy,
  MaterialServiceProxy,
  StockServiceProxy,
  UpdateInvoiceItemDto,
  OfferItemDto,
  SupplierOfferItemDto,
  InvoiceItemDto,
  CheckOfferQuantityAvailabelityDto,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "edit-invoice",
  templateUrl: "./edit-invoice.component.html",
  styleUrls: ["./edit-invoice.component.scss"],
})
export class EditInvoiceComponent extends AppComponentBase implements OnInit {
  saving: boolean = false;
  invoice: UpdateInvoiceDto = new UpdateInvoiceDto();
  offers: OfferDto[] = [];
  selectedOffer: OfferDto = new OfferDto();
  supplierOffers: SupplierOfferDto[] = [];
  selectedSupplierOffer: SupplierOfferDto = new SupplierOfferDto();
  suppliers: DropdownDto[] = [];
  materialsIds: number[] = [];
  materials: MaterialDto[] = [];
  offerQuantityAvailabelity: CheckOfferQuantityAvailabelityDto[] = []; 
  offerType = [
    { id: 1, name: this.l("OfferToCustomer") },
    { id: 0, name: this.l("OfferFromSupplier") },
  ];
  typeIsRequired: boolean = false;
  offerIsRequired: boolean = false;
  supplierOfferIsRequired: boolean = false;
  id: number;

  constructor(
    injector: Injector,
    private invoiceService: InvoiceServiceProxy,
    private customerService: CustomerServiceProxy,
    private offerService: OfferServiceProxy,
    private supplierOfferService: SupplierOfferServiceProxy,
    private materialService: MaterialServiceProxy,
    private stockService: StockServiceProxy,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.selectedOffer.offerItems = [];
    this.selectedSupplierOffer.supplierOfferItems = [];
    this.id = this.route.snapshot?.params?.id;

    this.invoice.invoiseDetails = [];
    this.getOffers();
    this.initialSuppliers();
    this.initialInvoice();
  }

  initialInvoice() {
    this.invoiceService.getForEdit(this.id)
    .subscribe((result) => {
      this.invoice = result;
      if (this.invoice.invoiceType == 1 && this.supplierOffers?.length == 0)
        this.getOffers();
      else if (this.invoice.invoiceType == 0 && this.offers?.length == 0)
        this.getSupplierOffers();
    });
  }

  initialSuppliers() {
    this.customerService
      .getSuppliers()
      .subscribe((result) => (this.suppliers = result));
  }

  getOffers() {
    this.offerService
      .getApproved()
      .subscribe((result) => {
        this.offers = result;
        if(this.offers){
          this.onChangeOffer(this.offers.find(x=>x.id == this.invoice?.offerId));
        }
      });
  }

  getSupplierOffers() {
    this.supplierOfferService
      .getApproved()
      .subscribe((result) => {
        this.supplierOffers = result;
        if(this.supplierOffers){
          this.onChangeSupplierOffer(this.supplierOffers.find(x=>x.id == this.invoice?.supplierOfferId));
        }
      });
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
    if(!materialId)
      return;
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
  
  CheckOfferQuantityAvailabelity(offerId) {
    this.offerService.checkOfferQuantityAvailabelity(offerId)
    .subscribe((result)=>{
      this.offerQuantityAvailabelity = result;
    })
  }
  onChangeOfferType(item) {
    this.invoice.invoiceType = item.id;
    if (this.invoice.invoiceType == 1 && this.supplierOffers?.length == 0)
      this.getSupplierOffers();
    else if (this.invoice.invoiceType == 0 && this.offers?.length == 0)
      this.getOffers();
  }

  onChangeOffer(item: OfferDto) {
    if(!item)
      return;
    this.selectedOffer = item;
    this.materialsIds = [];
    this.selectedOffer.offerItems.forEach((x) => {
      this.materialsIds.push(x.materialId);
      // let invoiceItem = new UpdateInvoiceItemDto();
      // invoiceItem.init({
      //   quantity: 0,
      //   offerItemId: x.id,
      //   totalMaterilPrice: 0,
      // });
      // this.invoice.invoiseDetails.push(invoiceItem);
    });
    if (this.materialsIds.length > 0) {
      this.initialMaterials();
    }
  }

  onChangeSupplierOffer(item: SupplierOfferDto) {
    if(item)
      return;
    this.selectedSupplierOffer = item;
    this.materialsIds = [];
    this.selectedSupplierOffer.supplierOfferItems.forEach((x) => {
      this.materialsIds.push(x.materialId);
      let invoiceItem = new UpdateInvoiceItemDto();
      // invoiceItem.init({
      //   quantity: 0,
      //   supplierOfferItemId: x.id,
      //   totalMaterilPrice: 0,
      // });
      // this.invoice.invoiseDetails.push(invoiceItem);
    });
    if (this.materialsIds.length > 0) {
      this.initialMaterials();
    }
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }

  save() {
    debugger;
    if(!this.checkValidQuantity())
      return;
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
        .update(this.invoice)
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

  checkValidQuantity() {
    if(this.invoice.invoiceType == 1){
      this.invoice.invoiseDetails.forEach((item)=>{
        var offerItem = this.selectedOffer.offerItems.find(x=>x.id == item.offerItemId);
        if(offerItem.quantity < item.quantity){
          abp.message.error(
            this.l('TheEnteredQuantityMustBeLessThanOfEqual{0}',offerItem.quantity),
            this.l('Material')+' '+ offerItem.material.name
          );
          return false;
        }
      });
    }else{
      this.invoice.invoiseDetails.some((item)=>{
        var supplierOfferItem = this.selectedSupplierOffer.supplierOfferItems.find(x=>x.id == item.offerItemId);
        if(supplierOfferItem.quantity < item.quantity){
          abp.message.error(
            this.l('TheEnteredQuantityMustBeLessThanOfEqual{0}',supplierOfferItem.quantity),
            this.l('Material')+' '+ supplierOfferItem.material.name
          );
          return false;
        }
      })
    }
    return true;
  }

getCssClasses(invoiceItem: InvoiceItemDto){
    const item = this.offerQuantityAvailabelity.find(x=>x.offerItemId == invoiceItem.offerItemId);
    if(item.quantity == 0)
      return 'hide-row';
    return '';
  }  
}
