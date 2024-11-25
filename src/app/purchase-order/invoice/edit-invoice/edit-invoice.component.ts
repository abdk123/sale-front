import { AppComponentBase } from '@shared/app-component-base';
import { Component,Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownDto, CustomerServiceProxy, OfferServiceProxy, UpdateOfferItemDto, InvoiceServiceProxy, UpdateInvoiceDto, OfferDto, SupplierOfferDto, MaterialDto, SupplierOfferServiceProxy, MaterialServiceProxy, StockServiceProxy, UpdateInvoiceItemDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { result } from 'lodash-es';

@Component({
  selector: "edit-invoice",
  templateUrl: "./edit-invoice.component.html",
  styleUrls: ["./edit-invoice.component.scss"],
})
export class EditInvoiceComponent extends AppComponentBase implements OnInit {
  saving: boolean = false;
  invoice: UpdateInvoiceDto = new UpdateInvoiceDto();
  offers:OfferDto[] = [];
  selectedOffer:OfferDto = new OfferDto();
  supplierOffers:SupplierOfferDto[] = [];
  selectedSupplierOffer:SupplierOfferDto = new SupplierOfferDto();
  suppliers: DropdownDto[] = [];
  materialsIds: number[] = [];
  materials:MaterialDto[] = [];
  type = 0;
  offerType = [
    { id: 0, name: this.l("OfferToCustomer") },
    { id: 1, name: this.l("OfferFromSupplier") },
  ];
  typeIsRequired: boolean = false;
  offerIsRequired: boolean = false;
  supplierOfferIsRequired: boolean = false;
  id:number;
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
  ){
    super(injector);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot?.params?.id;
    this.invoice.invoiseDetails = [];
    this.initialSuppliers();
    this.initialInvoice();
  }
  initialInvoice() {
    this.invoiceService.getForEdit(this.id)
    .subscribe(result=>{
      this.invoice = result;
      if(this.invoice.invoiceType == 1 && this.supplierOffers?.length == 0)
        this.getOffers();
      else if(this.invoice.invoiceType == 0 && this.offers?.length == 0)
        this.getSupplierOffers();
    })
  }

  initialSuppliers() {
    this.customerService.getForDropdown()
    .subscribe(result=>this.suppliers = result)
  }

  getOffers() {
    this.offerService.getApproved()
    .subscribe(result => {
      this.offers = result;
      this.initialInvoice();
    });
  }

  getSupplierOffers() {
    this.supplierOfferService.getApproved()
    .subscribe(result => this.supplierOffers = result);
  }
  initialMaterials() {
    this.materialService.getAllByIds(this.materialsIds).subscribe((result) => {
      this.materials = result;
    });
  }

  // initialMaterialUnits(materialId: number) {
  //   this.stockService.getMaterialUnits(materialId).subscribe((result) => {
  //     this.units = result;
  //   });
  // }


  // getMaterialName(itemId: number, materialId: number) {
  //   const offer = this.offers.find(x=>x.id == this.invoice.offerId);
  //   return this.materials.find((x) => x.id == materialId)?.name;
  // }

  getMaterialName(materialId: number) {
    return this.materials.find((x) => x.id == materialId)?.name;
  }
  getStock(materialId: number) {
    const material = this.materials.find(x=>x.id == materialId);

    if (material.stocks.length > -1) {
      var valueInLargeUnit = material.stocks.reduce(
        (sum, current) => sum + current.quantity,
        0
      );
      var valueInSmallUnit = material.stocks.reduce(
        (sum, current) => sum + current.numberInSmallUnit,
        0
      );
    }
    return `${valueInLargeUnit}-${valueInSmallUnit}`;
  }

  getSaleType(addedBySmallUnit) {
    return addedBySmallUnit
      ? `${this.l("SmallUnit")}`
      : `${this.l("LargeUnit")}`;
  }

  onChangeOfferType(item){
    this.invoice.invoiceType = item.id;
    if(this.invoice.invoiceType == 1 && this.supplierOffers?.length == 0)
      this.getOffers();
    else if(this.invoice.invoiceType == 0 && this.offers?.length == 0)
      this.getSupplierOffers();
  }

  onChangeOffer(item:OfferDto){
    this.selectedOffer = item;
    this.offerService.getItemsByOfferId(item.id)
    .subscribe((result: UpdateOfferItemDto[]) =>{
      this.materialsIds = [];
      result.forEach(x=>{
        this.materialsIds.push(x.materialId);
        let invoiceItem = new UpdateInvoiceItemDto();
        invoiceItem.init({quantity:0,offerItemId:x.id,totalMaterilPrice:0});
        this.invoice.invoiseDetails.push(invoiceItem);
      });
      this.initialMaterials();
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  save(){
    this.typeIsRequired = this.invoice.invoiceType == undefined ? true : false;
    this.offerIsRequired = this.invoice.offerId == undefined && this.invoice.invoiceType == 0 ? true : false;
    this.supplierOfferIsRequired = this.invoice.supplierId == undefined && this.invoice.invoiceType == 1 ? true : false;
    if (
      !this.typeIsRequired && !this.offerIsRequired && !this.supplierOfferIsRequired
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
