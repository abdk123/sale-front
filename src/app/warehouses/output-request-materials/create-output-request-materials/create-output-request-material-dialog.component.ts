import { CreateOutputRequestMaterialDto, CreateOutputRequestProductDto, MaterialCodeForDropdownDto, MaterialServiceProxy, UnitNameForDropdownDto, WarehouseMaterialNameForDropdownDto, WarehouseMaterialServiceProxy, WarehouseMaterialWithWarehouseNameAndExpiryDateDto, WarehouseNameForDropdownDto } from './../../../../shared/service-proxies/service-proxies';
import { AfterViewInit, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

export class CreateOutputRequestMaterialWithMaterialIdDto{
  outputRequestMaterial: CreateOutputRequestMaterialDto = new CreateOutputRequestMaterialDto();
  materialId: number | undefined;
}

@Component({
  selector: 'create-output-request-material-dialog',
  templateUrl: './create-output-request-material-dialog.component.html',
  styleUrls: ['./create-output-request-material-dialog.component.scss']
})
export class CreateOutputRequestMaterialDialogComponent extends AppComponentBase implements AfterViewInit {
  saving = false;
  units: UnitNameForDropdownDto[] = [];
  data: CreateOutputRequestMaterialWithMaterialIdDto[] = [];
  subData: CreateOutputRequestMaterialDto[] = [];
  outputRequestMaterialWithMaterialId = new CreateOutputRequestMaterialWithMaterialIdDto();
  unitsNames: UnitNameForDropdownDto[] = [];
  warehouseCodes: WarehouseMaterialNameForDropdownDto[] = [];
  materials: MaterialCodeForDropdownDto[] = [];
  selectedMaterials: MaterialCodeForDropdownDto[] = [];
  warehouseMaterials: WarehouseMaterialWithWarehouseNameAndExpiryDateDto[] = [];
  selectedWarehouseMaterials: WarehouseMaterialWithWarehouseNameAndExpiryDateDto[] = [];
  warehouseMaterialId: number;
  selectedMaterialId: number;
  selectedWarehouseMaterialId: number;
  select: boolean = true;
  ids: number[] = [];
  isButtonDisabled = false;
  @Input() productIds: CreateOutputRequestProductDto[] = [];
  @Output() saveoutputRequestMaterialList = new EventEmitter<CreateOutputRequestMaterialDto[]>();

  constructor(injector: Injector,
    private _warehouseMaterialService: WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _materialService: MaterialServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.productIds.forEach((element) => {
      this.ids.push(element.productId);
    });
    this.initialMaterialsForSelectedProducts(this.ids);
  }

  ngOnInit(): void {}

  initialMaterialsForSelectedProducts(productIds: number[]) {
    this._materialService.getByProductsIds(productIds)
      .subscribe((result) => {
        this.materials = result;
      });
  }

  initUnits(materialId) {
    this._unitService.getAllForMaterial(materialId).subscribe((result: UnitNameForDropdownDto[]) => {
      this.units = result;
    });
  }

  getUnitName(id: any) {
    this._unitService.get(id).subscribe((result) => {
      this.unitsNames.push(result);
    });
  }

  onSelectMaterial(event) {
    if(event.target == undefined){
      this.selectedMaterialId = event;
    }else{
      this.selectedMaterialId = event.target.value
    }
    this._warehouseMaterialService.getByMaterialId(this.outputRequestMaterialWithMaterialId.materialId)
      .subscribe((result) => {
        this.warehouseMaterials = result;
      });
      this.initUnits(this.selectedMaterialId);
  }

  onSelectwarehouseMaterial(event) {
    this.selectedWarehouseMaterialId = event.target.value;
  }

  addToOutputRequestMaterialList() {
    this.isButtonDisabled = false;
    if (this.outputRequestMaterialWithMaterialId.outputRequestMaterial.warehouseMaterialId == null ||
       this.outputRequestMaterialWithMaterialId.outputRequestMaterial.quantity == null ||
        this.outputRequestMaterialWithMaterialId.outputRequestMaterial.unitId == null) {
      return;
    }
    else {
      if(!this.data.some(x=>x.outputRequestMaterial.warehouseMaterialId == this.outputRequestMaterialWithMaterialId.outputRequestMaterial.warehouseMaterialId
        && x.outputRequestMaterial.unitId == this.outputRequestMaterialWithMaterialId.outputRequestMaterial.unitId
        && x.outputRequestMaterial.quantity == this.outputRequestMaterialWithMaterialId.outputRequestMaterial.quantity)){

        this.selectedMaterials.push(
          this.materials.find(x => x.id == this.outputRequestMaterialWithMaterialId.materialId)
          );
        this.onSelectMaterial(this.outputRequestMaterialWithMaterialId.materialId);


        this.selectedWarehouseMaterials.push(
          this.warehouseMaterials.find(x => x.id == this.outputRequestMaterialWithMaterialId.outputRequestMaterial.warehouseMaterialId)
        );

      this.getUnitName(this.outputRequestMaterialWithMaterialId.outputRequestMaterial.unitId);
      this.data.push(this.outputRequestMaterialWithMaterialId);
      this.data = [...this.data];
      this.subData = [];
      this.data.forEach((element)=>{
        this.subData.push(element.outputRequestMaterial);
      });
      this.saveoutputRequestMaterialList.emit(this.subData);
      this.saving = true;
      this.outputRequestMaterialWithMaterialId = new CreateOutputRequestMaterialWithMaterialIdDto();
    }
    }
  }

  edit(row: CreateOutputRequestMaterialWithMaterialIdDto) {
    this.isButtonDisabled = true;
    this.outputRequestMaterialWithMaterialId = row
    this.onSelectMaterial(row.materialId);
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.unitsNames.splice(index, 1);
      this.selectedWarehouseMaterials.splice(index, 1);
      this.selectedMaterials.splice(index, 1);
    }
    this.select = false;
  }

  delete(row: CreateOutputRequestMaterialWithMaterialIdDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
    this.selectedWarehouseMaterials = this.selectedWarehouseMaterials.filter((x)=>x.id != row.outputRequestMaterial.warehouseMaterialId);

    const i = this.selectedMaterials[index];
    this.selectedMaterials = this.selectedMaterials.filter((x)=>x.id != i.id);

    const u = this.unitsNames[index]
    this.unitsNames = this.unitsNames.filter((x)=>x.id != u.id);

      this.data.splice(index, 1);
      this.data.forEach((element)=>{
        this.subData.push(element.outputRequestMaterial);
      });
      this.saveoutputRequestMaterialList.emit(this.subData);
    }
  }
}
