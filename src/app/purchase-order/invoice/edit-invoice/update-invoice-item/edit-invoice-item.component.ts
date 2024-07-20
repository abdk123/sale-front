import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DropdownDto, InvoiceDto, InvoiceItemDto, InvoiceServiceProxy, MaterialServiceProxy, MaterialUnitDto, OfferServiceProxy, StockDto, StockServiceProxy, UnitDto, UpdateOfferItemDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: "edit-invoice-item",
  templateUrl: "./edit-invoice-item.component.html",
  styleUrls: ["./edit-invoice-item.component.scss"],
})
export class EditInvoiceItemComponent extends AppComponentBase implements OnInit {
  item: UpdateOfferItemDto = new UpdateOfferItemDto();
  @Output() onSave = new EventEmitter<UpdateOfferItemDto[]>();
  @Output() onSaveInvoice = new EventEmitter<InvoiceItemDto[]>();
  @Input() offerId: number;
  @Input() invoiceId: number;
  items: UpdateOfferItemDto[] = [];
  invoiceItems: InvoiceItemDto[] = [];
  materials: DropdownDto[] = [];
  units: MaterialUnitDto[] = [];
  stocks: StockDto[] = [];
  allUnits: MaterialUnitDto[] = [];
  loading: boolean = false;
  saving = false;
  indexUpdate = -1;
  materialIsRequired = false;
  addByUnitIsRequired = false;
  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private offerService: OfferServiceProxy,
    private stockService: StockServiceProxy,
    private invoiceService: InvoiceServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialInvoice();
    this.initialAllStocks();
    this.initialItems();
    this.initialMaterials();
    this.initialAllMaterialUnits();
    
  }

  initialInvoice() {
    this.invoiceService.getWithDetail(this.invoiceId)
    .subscribe(result=>{
      this.invoiceItems = result.invoiseDetails;
    })
  }

  initialItems() {
    this.offerService.getItemsByOfferId(this.offerId).subscribe((result) => {
      this.items = result;
    });
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

  initialAllMaterialUnits() {
    this.stockService.getAllMaterialUnits().subscribe((result) => {
      this.allUnits = result;
      this.loading = true;
    });
  }

  initialStocks(materialId: number) {
    this.stockService.getAllByMaterialId(materialId).subscribe((result) => {
      this.stocks.push.apply(this.stocks, result);
    });
  }

  onSelectMaterial(dto: DropdownDto) {
    this.initialMaterialUnits(dto.id);
    if (this.stocks.findIndex((x) => x.materialId) == -1) {
      this.initialStocks(dto.id);
    }
  }

  onChangeAddedbyUnit(dto: MaterialUnitDto) {
    if (dto) {
      if (dto.isSmallUnit) {
        this.item.addedBySmallUnit = dto.isSmallUnit;
        this.item.sizeId = dto.id;
      } else {
        this.item.unitId = dto.id;
      }
    }
  }

  save() {
    this.materialIsRequired = this.item.materialId ? false : true;
    this.addByUnitIsRequired =
      this.item.sizeId || this.item.unitId ? false : true;

    if (!this.materialIsRequired && !this.addByUnitIsRequired) {
      this.saving = true;
      if (this.indexUpdate > -1) this.updateItem();
      else {
        this.addNewItem();
      }
      this.saving = false;
    }
  }

  initialItemForUpdate(index: number) {
    this.indexUpdate = index;
    const materialId = this.items[this.indexUpdate]?.materialId;
    if(materialId){
      this.initialMaterialUnits(materialId);
      this.item = this.items[this.indexUpdate];
    }
    // 
    // this.initialMaterialUnits(this.item.materialId);
    // if (this.stocks.findIndex((x) => x.materialId) == -1) {
    //   this.initialStocks(this.item.materialId);
    // }
  }

  DeleteItem(i){
    const item = this.items[i];
    this.items = this.items.filter(x=>x.id != item.id);
    this.onSave.emit(this.items);
  }

  cancelUpdate() {
    this.indexUpdate = -1;
    this.item = new UpdateOfferItemDto();
  }

  updateItem() {
    this.items[this.indexUpdate].materialId = this.item.materialId;
    this.items[this.indexUpdate].quantity = this.item.quantity;
    this.items[this.indexUpdate].addedBySmallUnit = this.item.addedBySmallUnit;
    this.items[this.indexUpdate].sizeId = this.item.sizeId;
    this.items[this.indexUpdate].unitId = this.item.unitId;
    this.items[this.indexUpdate].unitPrice = this.item.unitPrice;
    this.items[this.indexUpdate].specefecation = this.item.specefecation;
    this.onSave.emit(this.items);
    this.item = new UpdateOfferItemDto();
  }

  addNewItem() {
    this.items.push(this.item);
    this.item = new UpdateOfferItemDto();
    this.onSave.emit(this.items);
  }

  deleteItem(index: number): void {
    var material = this.materials.find(
      (x) => x.id == this.items[index].materialId
    );
    abp.message.confirm(
      this.l("OfferMaterialDeleteWarningMessage", material.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this.items.splice(index, 1);
        }
      }
    );
  }

  getMaterialName(materialId: number) {
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

  getInvoiceQuantity(offerItemId){
    const invoiceItem = this.invoiceItems.find(x=>x.offerItem.id == offerItemId);
    if(invoiceItem){
      return invoiceItem.quantity;
    }
    return 0;
  }

  getInvoicePrice(offerItemId){
    const invoiceItem = this.invoiceItems.find(x=>x.offerItem.id == offerItemId);
    if(invoiceItem){
      return invoiceItem.totalMaterilPrice;
    }
    return 0;
  }
  updateInvoiceQuantity(args,offerItemId){
    this.invoiceItems.find(x=>x.offerItem.id == offerItemId).quantity = Number(args.target.value);
    this.onSaveInvoice.emit(this.invoiceItems);
  }

  updateInvoicePrice(args,offerItemId){
    this.invoiceItems.find(x=>x.offerItem.id == offerItemId).totalMaterilPrice = Number(args.target.value);
    this.onSaveInvoice.emit(this.invoiceItems);
    
  }

  getTotalPrice(offerItemId){
    let total = 0;
    const invoiceItem = this.invoiceItems.find(x=>x.offerItem.id == offerItemId);
    if(invoiceItem && invoiceItem.quantity && invoiceItem.totalMaterilPrice){
      total = Number(invoiceItem.quantity) + Number(invoiceItem.totalMaterilPrice);
    }
    return total;
  }

  
}
