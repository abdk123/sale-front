import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateInvoiceDto, CreateInvoiceItemDto, CustomerDto, CustomerServiceProxy, DropdownDto, InvoiceServiceProxy, MaterialServiceProxy, MaterialUnitDto, OfferDto, OfferServiceProxy, StockDto, StockServiceProxy, SupplierOfferDto, SupplierOfferServiceProxy, UpdateOfferDto, UpdateOfferItemDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { finalize, subscribeOn } from 'rxjs';

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent extends AppComponentBase implements OnInit {

  saving: boolean = false;
  invoice: CreateInvoiceDto = new CreateInvoiceDto();
  offers:OfferDto[] = [];
  selectedOffer:OfferDto = new OfferDto();
  supplierOffers:SupplierOfferDto[] = [];
  selectedSupplierOffer:SupplierOfferDto = new SupplierOfferDto();
  suppliers: DropdownDto[] = [];
  materials: DropdownDto[] = [];
  units: MaterialUnitDto[] = [];
  stocks: StockDto[] = [];
  allUnits: MaterialUnitDto[] = [];
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
  ){
    super(injector);
  }

  ngOnInit(): void {
    this.invoice.invoiseDetails = [];
    this.invoice.invoiceType = 0;
    this.getOffers();
    this.initialAllStocks();
    this.initialSuppliers();
    this.initialMaterials();
    this.initialAllMaterialUnits();
  }

  initialSuppliers() {
    this.customerService.getForDropdown()
    .subscribe(result=>this.suppliers = result)
  }

  initialAllMaterialUnits() {
    this.stockService.getAllMaterialUnits().subscribe((result) => {
      this.allUnits = result;
    });
  }

  getOffers() {
    this.offerService.getApproved()
    .subscribe(result => this.offers = result);
  }

  getSupplierOffers() {
    this.supplierOfferService.getApproved()
    .subscribe(result => this.supplierOffers = result);
  }
  initialMaterials() {
    this.materialService.getForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }

  initialMaterialUnits(materialId: number) {
    this.stockService.getMaterialUnits(materialId).subscribe((result) => {
      this.units = result;
    });
  }


  getMaterialName(itemId: number, materialId: number) {
    const offer = this.offers.find(x=>x.id == this.invoice.offerId);
    return this.materials.find((x) => x.id == materialId)?.name;
  }

  getUnit(id: number) {
    if (id) {
      return this.allUnits.find((x) => x.id == id && !x.isSmallUnit)?.name;
    }
    return "";
  }

  getPackingUnit(id: number) {
    if (id) {
      return this.allUnits.find((x) => x.id == id && x.isSmallUnit)?.name;
    }
    return "";
  }

  allStocks: StockDto[] = [];
  initialAllStocks(){
    this.stockService.getAll(undefined,undefined,undefined,undefined,undefined,0,100000)
    .subscribe((result)=>{
      this.allStocks = result.items;
    })
  }

  getStock(materialId: number) {
    debugger;
    if(this.stocks.length !== 0){
    var materialStocks = this.stocks.filter((x) => x.materialId == materialId);
    }else{
      var materialStocks = this.allStocks.filter(
        (x) => x.materialId == materialId
      );
    }

    if (materialStocks.length > -1) {
      var valueInLargeUnit = materialStocks.reduce(
        (sum, current) => sum + current.numberInLargeUnit,
        0
      );
      var valueInSmallUnit = materialStocks.reduce(
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
      this.getSupplierOffers();
    else if(this.invoice.invoiceType == 0 && this.offers?.length == 0)
      this.getSupplierOffers();
  }

  onChangeOffer(item:OfferDto){
    this.selectedOffer = item;
    this.offerService.getItemsByOfferId(item.id)
    .subscribe((result: UpdateOfferItemDto[]) =>{
      result.forEach(x=>{
        let invoiceItem = new CreateInvoiceItemDto();
        invoiceItem.init({quantity:0,offerItemId:x.id,totalMaterilPrice:0});
        this.invoice.invoiseDetails.push(invoiceItem);
      });
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
