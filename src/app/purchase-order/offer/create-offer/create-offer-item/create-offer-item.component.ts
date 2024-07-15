import { Component, EventEmitter, Injector, Input, OnInit, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateOfferItemDto,
  DropdownDto,
  MaterialServiceProxy,
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
  @Input() item: CreateOfferItemDto;
  @Output() onSave = new EventEmitter<CreateOfferItemDto>();
  items:CreateOfferItemDto[] = [];
  materials: DropdownDto[] = [];
  units: DropdownDto[] = [];
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
    if(this.item){
      this.initialMaterialUnits(this.item.materialId);
    }else{
      this.item = new CreateOfferItemDto();
    }
  }

  initialMaterials() {
    this.materialService.getForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }

  initialMaterialUnits(materialId: number){
    this.stockService.getMaterialUnits(materialId)
    .subscribe(result=>{
      this.units = result;
    });
  }

  onSelectMaterial(args:DropdownDto) {
    this.initialMaterialUnits(args.id);
  }

  save(){
    this.materialIsRequired = this.item.materialId ? false : true;
    
    if(!this.materialIsRequired){
      
    }
  }
}
