import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateOfferItemDto,
  DropdownDto,
  MaterialServiceProxy,
  MaterialUnitDto,
  StockDto,
  StockServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "create-offer-item",
  templateUrl: "./create-offer-item.component.html",
  styleUrls: ["./create-offer-item.component.scss"],
})
export class CreateOfferItemComponent
  extends AppComponentBase
  implements OnInit
{
  item: CreateOfferItemDto = new CreateOfferItemDto();
  @Output() onSave = new EventEmitter<CreateOfferItemDto[]>();
  items: CreateOfferItemDto[] = [];
  materials: DropdownDto[] = [];
  units: MaterialUnitDto[] = [];
  stocks: StockDto[] = [];
  saving=false;
  indexUpdate = -1;
  materialIsRequired = false;
  addByUnitIsRequired = false;
  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private stockService: StockServiceProxy
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

  initialMaterialUnits(materialId: number) {
    this.stockService.getMaterialUnits(materialId).subscribe((result) => {
      this.units = result;
    });
  }

  initialStocks(materialId: number) {
    this.stockService.getAllByMaterialId(materialId).subscribe((result) => {
      this.stocks.push.apply(this.stocks, result);
    });
  }

  onSelectMaterial(dto: DropdownDto) {
    this.initialMaterialUnits(dto.id);
    if(this.stocks.findIndex(x=>x.materialId) == -1){
      this.initialStocks(dto.id);
    }
  }

  onChangeAddedbyUnit(dto: MaterialUnitDto) {
    if(dto){
      if (dto.isSmallUnit) {
        this.item.addedBySmallUnit = true;
        this.item.sizeId = dto.id;
        this.item.unitId = undefined;
      } else {
        this.item.addedBySmallUnit = false;
        this.item.unitId = dto.id;
        this.item.sizeId = undefined;
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
    this.item = this.items[this.indexUpdate];
  }

  cancelUpdate() {
    this.indexUpdate = -1;
    this.item = new CreateOfferItemDto();
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
    this.item = new CreateOfferItemDto();
  }

  addNewItem() {
    this.items.push(this.item);
    this.item = new CreateOfferItemDto();
    this.onSave.emit(this.items);
  }

  deleteItem(index:number): void {
    var material = this.materials.find(x=> x.id == this.items[index].materialId);
    abp.message.confirm(
      this.l('OfferMaterialDeleteWarningMessage',material.name),
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

  getUnit(id: number) {
    if (id) {
      return this.units.find((x) => x.id == id && !x.isSmallUnit)?.name;
    }
    return "";
  }

  getPackingUnit(id: number) {
    if (id) {
      return this.units.find((x) => x.id == id && x.isSmallUnit)?.name;
    }
    return "";
  }

  getStock(materialId:number){
    var materialStocks = this.stocks.filter(x=>x.materialId == materialId);

    if(materialStocks.length > -1){
      var valueInLargeUnit = materialStocks.reduce((sum, current) => sum + current.numberInLargeUnit, 0);
      var valueInSmallUnit = materialStocks.reduce((sum, current) => sum + current.numberInSmallUnit, 0);
    }
    return `${valueInLargeUnit}-${valueInSmallUnit}`;
  }

  getSaleType(addedBySmallUnit){
    return addedBySmallUnit ? `${this.l("SmallUnit")}` : `${this.l("LargeUnit")}`
  }
}
