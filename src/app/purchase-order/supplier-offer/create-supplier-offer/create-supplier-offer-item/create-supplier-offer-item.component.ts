import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateSupplierOfferItemDto,
  DropdownDto,
  MaterialServiceProxy,
  SizeDto,
  StockDto,
  StockServiceProxy,
  UnitDto,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "create-supplier-offer-item",
  templateUrl: "./create-supplier-offer-item.component.html",
  styleUrls: ["./create-supplier-offer-item.component.scss"],
})
export class CreateSupplierOfferItemComponent
  extends AppComponentBase
  implements OnInit
{
  item: CreateSupplierOfferItemDto = new CreateSupplierOfferItemDto();
  @Output() onSave = new EventEmitter<CreateSupplierOfferItemDto[]>();
  items: CreateSupplierOfferItemDto[] = [];
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
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialMaterials();
  }

  initialMaterials() {
    this.materialService.getForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }

  onSelectMaterial(dto: DropdownDto) {
    this.materialService.getById(dto.id)
    .subscribe(result=>{
      if(this.units.findIndex(x=>x.id == result.unitId) == -1)
        this.units.push(result.unit);
      result.stocks.forEach(stock=>{
        this.sizes = [];
        this.sizes.push(stock.size);
        if(this.stocks.findIndex(x=>x.id == stock.id) == -1)
          this.stocks.push(stock);
      })
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
    this.item = new CreateSupplierOfferItemDto();
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
    this.item = new CreateSupplierOfferItemDto();
  }

  addNewItem() {
    this.items.push(this.item);
    this.item = new CreateSupplierOfferItemDto();
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

  getUnit(item: CreateSupplierOfferItemDto) {
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
