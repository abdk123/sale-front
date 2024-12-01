import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateOfferItemDto,
  DropdownDto,
  MaterialServiceProxy,
  SizeDto,
  StockDto,
  StockServiceProxy,
  UnitDto,
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

  getSizeName(sizeId, materilId) {
    return this.stocks.find(x=>x=>x.id == sizeId && x.materialId == materilId)?.size.name;
  }

  getUnitName(materialId) {
    return this.units.find(x=>x=>x.materialId == materialId)?.name;
  }

  getStock(materialId:number){
    var materialStocks = this.stocks.filter(x=>x.materialId == materialId);
    if(materialStocks.length == -1)
      return 0;
    let text = '';
    let totalQuantity = 0;
    materialStocks.forEach(stock=>{
      const count = stock.conversionValue > 0 ? stock.quantity * stock.conversionValue : 0;
      text = count + ' ' + stock.size?.name + '-';
      totalQuantity += stock.quantity;
    })
    text = text.substring(0,text.length - 1);
    return `${totalQuantity} ${this.getUnitName(materialId)} (${text})`;
  }

  getSaleType(addedBySmallUnit){
    return addedBySmallUnit ? `${this.l("Size")}` : `بالطن`
  }
}
