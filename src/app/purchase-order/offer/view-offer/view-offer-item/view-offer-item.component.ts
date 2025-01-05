import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DropdownDto, MaterialDto, MaterialServiceProxy, OfferItemDto, SizeDto, StockDto, StockServiceProxy, UnitDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-offer-item',
  templateUrl: './view-offer-item.component.html',
  styleUrls: ['./view-offer-item.component.scss']
})
export class ViewOfferItemComponent extends AppComponentBase implements OnInit,OnChanges {
  
  @Input() items: OfferItemDto[] = [];
  materials: DropdownDto[] = [];
  sizes: SizeDto[] = [];
  units: UnitDto[] = [];
  stocks: StockDto[] = [];

  constructor(
    injector: Injector,
    private materialService: MaterialServiceProxy,
    private stockService: StockServiceProxy,
  ) {
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.items?.length > 0){
      this.initialItems();
    }
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
        data.forEach(material => {
          this.initialInfo(material);
        });
      })
  }
  
  initialInfo(material){
    //Units
    if(this.units.findIndex(x=>x.id == material.unitId) == -1)
      this.units.push(material.unit);
    //Szes
    material.stocks.forEach(stock=>{
      this.sizes = [];
      this.sizes.push(stock.size);
      if(this.stocks.findIndex(x=>x.id == stock.id) == -1)
        this.stocks.push(stock);
    })
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
