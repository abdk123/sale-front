import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CustomerServiceProxy, DropdownDto, MaterialServiceProxy, MaterialUnitDto, OfferItemDto, OfferServiceProxy, StockDto, StockServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-offer-item',
  templateUrl: './view-offer-item.component.html',
  styleUrls: ['./view-offer-item.component.scss']
})
export class ViewOfferItemComponent extends AppComponentBase implements OnInit {
  
  @Input() items: OfferItemDto[] = [];
  materials: DropdownDto[] = [];
  units: MaterialUnitDto[] = [];
  stocks: StockDto[] = [];
  allUnits: MaterialUnitDto[] = [];
  allStocks: StockDto[] = [];

  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private stockService: StockServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialAllStocks();
    this.initialMaterials();
    this.initialAllMaterialUnits();
  }

  
  loading: boolean = false;
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
    });
  }

  
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

  getMaterialName(materialId: number) {
    return this.materials.find((x) => x.id == materialId)?.name;
  }

  getUnit(item) {
    
    if (item.addedBySmallUnit) {
      return this.allUnits.find((x) => x.id == item.sizeId)?.name;
    }
    return this.allUnits.find((x) => x.id == item.unitId)?.name;
  }

  getPackingUnit(id: number) {
    if (id) {
      return this.allUnits.find((x) => x.id == id && x.isSmallUnit)?.name;
    }
    return "";
  }
  
}
