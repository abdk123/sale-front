import { AfterViewInit, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateOutputRequestProductDto, MaterialCodeForDropdownDto, MaterialServiceProxy,
  MaterialincludeWarehouseMaterialDto, UnitNameForDropdownDto, UnitServiceProxy,
  UpdateOutputRequestMaterialDto, WarehouseMaterialServiceProxy, WarehouseMaterialWithWarehouseNameAndExpiryDateDto
}
  from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

export class UpdateOutputRequestMaterialWithMaterialIdDto {
  outputRequestMaterial: UpdateOutputRequestMaterialDto = new UpdateOutputRequestMaterialDto();
  materialId: number | undefined;
}

@Component({
  selector: 'edit-output-request-material-dialog',
  templateUrl: './edit-output-request-material-dialog.component.html',
  styleUrls: ['./edit-output-request-material-dialog.component.scss']
})

export class EditOutputRequestMaterialDialogComponent extends AppComponentBase implements AfterViewInit {
  saving = false;
  units: UnitNameForDropdownDto[] = [];
  data: UpdateOutputRequestMaterialWithMaterialIdDto[] = [];
  subData: UpdateOutputRequestMaterialDto[] = [];
  outputRequestMaterialWithMaterialId: UpdateOutputRequestMaterialWithMaterialIdDto = new UpdateOutputRequestMaterialWithMaterialIdDto();
  unitsNames: UnitNameForDropdownDto[] = [];
  materials: MaterialCodeForDropdownDto[] = [];
  selectedMaterials: MaterialCodeForDropdownDto[] = [];
  warehouseMaterials: WarehouseMaterialWithWarehouseNameAndExpiryDateDto[] = [];
  allWarehouseMaterials: WarehouseMaterialWithWarehouseNameAndExpiryDateDto[] = [];
  selectedWarehouseMaterials: WarehouseMaterialWithWarehouseNameAndExpiryDateDto[] = [];
  selectedMaterialId: number;
  selectedWarehouseMaterialId: number;
  select: boolean = true;
  ids: number[] = [];
  materialIds: number[] = [];
  materialsWithWarehouseMaterials: MaterialincludeWarehouseMaterialDto[] = [];
  isButtonDisabled = false;
  @Input() productIds: CreateOutputRequestProductDto[] = [];
  @Input() previousMaterials: UpdateOutputRequestMaterialDto[] = [];
  @Output() saveoutputRequestMaterialList = new EventEmitter<UpdateOutputRequestMaterialDto[]>();

  constructor(injector: Injector,
    private _unitService: UnitServiceProxy,
    private _warehouseMaterialService: WarehouseMaterialServiceProxy,
    private _materialService: MaterialServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.previousMaterials.forEach((element) => {
      this.materialIds.push(element.warehouseMaterialId);
    });
    this.productIds.forEach((element) => {
      this.ids.push(element.productId);
    });
    this.initialMaterialsForSelectedProducts(this.ids);

    this._warehouseMaterialService.getWithWarehouseNameAndExpiryDate()
      .subscribe((result) => {
        this.allWarehouseMaterials = result;
      });
  }

  getMaterials() {
    this.previousMaterials.forEach((element) => {
      const material = new UpdateOutputRequestMaterialWithMaterialIdDto();
      const m = this.materialsWithWarehouseMaterials
        .find((x) => x.warehouseMaterials.some((y) => y.id == element.warehouseMaterialId));
      material.materialId = m.id;
      material.outputRequestMaterial = element;
      this.data.push(material);
      this.getUnitName(element.unitId);
    });
  }

  getSelectedMaterials() {
    for (let i = 0; i < this.data.length; i++) {
      const material = new MaterialCodeForDropdownDto();
      material.init({
        id: this.data[i].materialId,
        code: this.materials.find((x) => x.id == this.data[i].materialId).code
      })
      this.selectedMaterials.push(material);
      if (i == this.data.length - 1) {
        this.getSelectdWarehouseMaterials();
      }
    }
  }

  getSelectdWarehouseMaterials() {
    this.data.forEach((element) => {
      const selectWarehouse = new WarehouseMaterialWithWarehouseNameAndExpiryDateDto();
      selectWarehouse.init({
        id: element.outputRequestMaterial.warehouseMaterialId,
        info: this.allWarehouseMaterials.find((x) => x.id == element.outputRequestMaterial.warehouseMaterialId).info
      });
      this.selectedWarehouseMaterials.push(selectWarehouse);
    });
  }

  ngOnInit(): void { }

  initialMaterialsForSelectedProducts(productIds: number[]) {
    this._materialService.getByProductsIds(productIds)
      .subscribe((result) => {
        this.materials = result;

        this._materialService.getIncludeWarehouseMaterials(this.materialIds)
          .subscribe((result) => {
            this.materialsWithWarehouseMaterials = result;
            this.getMaterials();
            this.getSelectedMaterials();
          });
      });
  }

  initUnits(materialId) {
    this._unitService.getAllForMaterial(materialId)
      .subscribe((response: UnitNameForDropdownDto[]) => {
        this.units = response;
      });
  }

  getUnitName(id: number) {
    this._unitService.get(id).subscribe((response) => {
      debugger;
      this.unitsNames.push(response);
    });
  }

  addToOutputRequestMaterialList() {
    this.isButtonDisabled = false;
    if (this.outputRequestMaterialWithMaterialId.outputRequestMaterial.warehouseMaterialId == null ||
      this.outputRequestMaterialWithMaterialId.outputRequestMaterial.quantity == null ||
      this.outputRequestMaterialWithMaterialId.outputRequestMaterial.unitId == null) {
      return;
    }
    else {

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
      this.data.forEach((element) => {
        this.subData.push(element.outputRequestMaterial);
      });
      this.saveoutputRequestMaterialList.emit(this.subData);
      this.saving = true;
      this.outputRequestMaterialWithMaterialId = new UpdateOutputRequestMaterialWithMaterialIdDto();
    }
  }

  edit(row: UpdateOutputRequestMaterialWithMaterialIdDto) {
    this.isButtonDisabled = true;
    this.outputRequestMaterialWithMaterialId = row;
    this.onSelectMaterial(row.materialId);
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.unitsNames.splice(index, 1);
      this.selectedWarehouseMaterials.splice(index, 1);
      this.selectedMaterials.splice(index, 1);
    }
  }

  delete(row: UpdateOutputRequestMaterialWithMaterialIdDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.selectedWarehouseMaterials = this.selectedWarehouseMaterials.filter((x) => x.id != row.outputRequestMaterial.warehouseMaterialId);

      const i = this.selectedMaterials[index];
      this.selectedMaterials = this.selectedMaterials.filter((x) => x.id != i.id);

      const u = this.unitsNames[index]
      this.unitsNames = this.unitsNames.filter((x) => x.id != u.id);
      debugger;
      this.data.splice(index, 1);
      this.subData = [];
      this.data.forEach((element) => {
        this.subData.push(element.outputRequestMaterial);
      });
      this.saveoutputRequestMaterialList.emit(this.subData);
    }
  }

  onSelectMaterial(event) {
    if (event.target == undefined) {
      this.selectedMaterialId = event;
    } else {
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
}
