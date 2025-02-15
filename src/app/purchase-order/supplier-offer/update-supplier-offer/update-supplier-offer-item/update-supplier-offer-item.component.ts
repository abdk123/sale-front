import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DropdownDto, MaterialServiceProxy, SupplierOfferServiceProxy, StockDto, UnitDto, UpdateSupplierOfferItemDto, SizeDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: "update-supplier-offer-item",
  templateUrl: "./update-supplier-offer-item.component.html",
  styleUrls: ["./update-supplier-offer-item.component.scss"],
})
export class UpdateSupplierOfferItemComponent extends AppComponentBase implements OnInit {
  item: UpdateSupplierOfferItemDto = new UpdateSupplierOfferItemDto();
  @Output() onSave = new EventEmitter<UpdateSupplierOfferItemDto[]>();
  @Input() offerId: number;
  items: UpdateSupplierOfferItemDto[] = [];
  materials: DropdownDto[] = [];
  sizes: SizeDto[] = [];
  units: UnitDto[] = [];
  stocks: StockDto[] = [];
  saving=false;
  indexUpdate = -1;
  materialIsRequired = false;
  addByUnitIsRequired = false;
  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private offerService: SupplierOfferServiceProxy,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialMaterials();
    this.initialItems();
  }

  initialItems() {
    this.offerService.getItemsBySupplierOfferId(this.offerId).subscribe((result) => {
      this.items = result;
      let materialsIds = [];
      this.items.forEach(x=> {materialsIds.push(x.materialId)});
      this.materialService.getAllByIds(materialsIds)
      .subscribe(data=>{
        this.initialInfo(data);
      })
    });
  }

  initialMaterials() {
    this.materialService.getForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }

  onSelectMaterial(dto: DropdownDto) {
    this.materialService.getById(dto.id)
    .subscribe(result=>{
      this.initialInfo(result);
    })
  }

  initialInfo(result){
    if(this.units.findIndex(x=>x.id == result.unitId) == -1)
      this.units.push(result.unit);
    result.stocks.forEach(stock=>{
      this.sizes = [];
      this.sizes.push(stock.size);
      if(this.stocks.findIndex(x=>x.id == stock.id) == -1)
        this.stocks.push(stock);
    })
  }

  onSelectPackageUnit(dto: StockDto){

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
    this.item = this.items[this.indexUpdate];
  }

  cancelUpdate() {
    this.indexUpdate = -1;
    this.item = new UpdateSupplierOfferItemDto();
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
    this.item = new UpdateSupplierOfferItemDto();
  }

  addNewItem() {
    this.items.push(this.item);
    this.item = new UpdateSupplierOfferItemDto();
    this.onSave.emit(this.items);
  }

  deleteItem(index:number): void {
    var material = this.materials.find(x=> x.id == this.items[index].materialId);
    abp.message.confirm(
      this.l('ConfirmationDeleteTheItem{0}',material.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this.items.splice(index,1);
        }
      }
    );
  }

  getMaterialName(materialId: number) {
    return this.materials.find((x) => x.id == materialId)?.name;
  }

  getUnit(item: UpdateSupplierOfferItemDto) {
    if (item.addedBySmallUnit) {
      return this.getMaterialName(item.materialId);
    }
    return this.stocks.find(x=>x=>x.materialId == item.materialId)?.size.name;
  }

  getStock(materialId:number){
    var materialStocks = this.stocks.filter(x=>x.materialId == materialId);

    if(materialStocks.length > -1){
      var valueInLargeUnit = materialStocks.reduce((sum, current) => sum + current.quantity, 0);
      var valueInSmallUnit = materialStocks.reduce((sum, current) => sum + current.numberInSmallUnit, 0);
    }
    return `${valueInLargeUnit}-${valueInSmallUnit}`;
  }

  getSaleType(addedBySmallUnit){
    return addedBySmallUnit ? `${this.l("SmallUnit")}` : `${this.l("LargeUnit")}`
  }
}
