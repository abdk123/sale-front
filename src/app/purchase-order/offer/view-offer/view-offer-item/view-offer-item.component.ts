import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DropdownDto, MaterialDto, MaterialServiceProxy, OfferItemDto, SizeDto, StockDto, StockServiceProxy, UnitDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-offer-item',
  templateUrl: './view-offer-item.component.html',
  styleUrls: ['./view-offer-item.component.scss']
})
export class ViewOfferItemComponent extends AppComponentBase implements OnInit {
  
  @Input() items: OfferItemDto[] = [];
  sizes: SizeDto[] = [];
  units: UnitDto[] = [];
  stocks: StockDto[] = [];
  materials: DropdownDto[] = [];

  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private stockService: StockServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialMaterials();
  }

  
  loading: boolean = false;
  initialMaterials() {
    this.materialService.getForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }

  initialItems() {
    
      let materialsIds = [];
      this.items.forEach(x=> {materialsIds.push(x.materialId)});
      this.materialService.getAllByIds(materialsIds)
      .subscribe(data=>{
        this.initialInfo(data);
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

  getMaterialName(materialId: number) {
    return this.materials.find((x) => x.id == materialId)?.name;
  }

  getUnit(item: OfferItemDto) {
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
