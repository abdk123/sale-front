import { Component, OnInit } from '@angular/core';
import { MaterialCodeForDropdownDto, MaterialDto, MaterialServiceProxy, MaterialincludeWarehouseMaterialDto, WarehouseMaterialServiceProxy, WarehouseMaterialWithWarehouseNameAndExpiryDateDto } from '@shared/service-proxies/service-proxies';
import { OutputRequestDto, OutputRequestServiceProxy, UnitDto, UnitServiceProxy, WarehouseDto, WarehouseServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-output-request-dialog',
  templateUrl: './view-output-request-dialog.component.html',
  styleUrls: ['./view-output-request-dialog.component.scss']
})
export class ViewOutputRequestDialogComponent implements OnInit {

  data: OutputRequestDto = new OutputRequestDto();
  id: number;
  loaded = false;
  editable: true;
  unitName: UnitDto = new UnitDto();
  material: MaterialDto = new MaterialDto();
  unitNames: UnitDto[] = [];
  warehouseNames: WarehouseDto[] = [];
  warehouseName: WarehouseDto = new WarehouseDto();
  allMaterialsCodes: MaterialCodeForDropdownDto[] = [];
  materialsCodes: MaterialCodeForDropdownDto[] = [];
  allWarehouseMaterials: WarehouseMaterialWithWarehouseNameAndExpiryDateDto[] = [];
  warehouseMaterials: WarehouseMaterialWithWarehouseNameAndExpiryDateDto[] = [];
  productIds: number[] = [];
  materialIds: number[] = [];
  materialsWithWarehouseMaterials: MaterialincludeWarehouseMaterialDto[] = [];


  constructor(public bsModalRef: BsModalRef,
    private _outputService: OutputRequestServiceProxy,
    private _unitService: UnitServiceProxy,
    private _warehouseService: WarehouseServiceProxy,
    private _warehouseMaterialService: WarehouseMaterialServiceProxy,
    private _materialService: MaterialServiceProxy) { }

  ngOnInit(): void {
    this.initialAllWarehouseMaterial();
    this.initOutputRequest();
  }

  initOutputRequest() {
    this._outputService.get(this.id).subscribe((response: OutputRequestDto) => {
      this.data = response;
      this.loaded = true;

      this.data.outputRequestMaterials.forEach((element) => {
        this.materialIds.push(element.warehouseMaterialId);
        this.initUnitNames(element.unitId);
        this.initWarehouseCode(element.warehouseMaterial.warehouseId);
        this.initMaterialName(element.warehouseMaterial.materialId);
      });

      for (let i = 0; i < this.data.outputRequestProducts.length; i++) {
        if (i < this.data.outputRequestProducts.length - 1)
          this.productIds.push(this.data?.outputRequestProducts[i]?.product?.id);
        else if (i = this.data.outputRequestProducts.length - 1) {
          this.productIds.push(this.data?.outputRequestProducts[i]?.product?.id);
          this.initialAllMaterialsCodes(this.productIds);
        }
      }      
    });
  }

  initUnitNames(id: number) {
    this._unitService.get(id).subscribe((result) => {
      this.unitName = result;
      this.unitNames.push(this.unitName);
    });
  }

  initWarehouseCode(id: number) {
    this._warehouseService.get(id).subscribe((result) => {
      this.warehouseName = result;
      this.warehouseNames.push(this.warehouseName);
    });
  }

  initMaterialName(id: number) {
    this._materialService.get(id).subscribe((result) => {
      this.material = result;
    });
  }

  initialAllMaterialsCodes(productIds: number[]) {
    this._materialService.getByProductsIds(productIds)
      .subscribe((result) => {
        this.allMaterialsCodes = result;     
        
        this._materialService.getIncludeWarehouseMaterials(this.materialIds)
          .subscribe((result) => {
            this.materialsWithWarehouseMaterials = result;
            this.initilaMaterialsCodes();
          });          
      });
  }

  initilaMaterialsCodes() {
    this.data.outputRequestMaterials.forEach((element) => {
      const warehouseMaterial = this.allWarehouseMaterials
      .find((x)=>x.id == element.warehouseMaterialId);
      this.warehouseMaterials.push(warehouseMaterial);


      const materialId = this.materialsWithWarehouseMaterials
        .find((x) => x.warehouseMaterials.some((y) => y.id == element.warehouseMaterialId));
      const material = this.allMaterialsCodes.find((z)=>z.id == materialId.id);
      this.materialsCodes.push(material);
    });
  }

  initialAllWarehouseMaterial() {
    this._warehouseMaterialService.getWithWarehouseNameAndExpiryDate()
      .subscribe((result) => {
        this.allWarehouseMaterials = result;
      });
  }
}




