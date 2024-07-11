import { AfterViewInit, Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import {
  WarehouseMaterialServiceProxy, SupplierServiceProxy, UpdateWarehouseMaterialDto,
  UnitNameForDropdownDto, MaterialNameForDropdownDto, UnitServiceProxy, MaterialServiceProxy,
  WarehouseServiceProxy, SupplierNameForDropdownDto, WarehouseNameForDropdownDto, MaterialCodeForDropdownDto
}
  from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-warehouse-material-dialog',
  templateUrl: './edit-warehouse-material-dialog.component.html',
})

export class EditWarehouseMaterialDialogComponent extends AppComponentBase implements AfterViewInit {
  saving = false;
  loaded: boolean = false;
  id: number;
  minDate: Date;
  maxDate: Date;
  selectedValue: string = 'option1';
  warehouseMaterial = new UpdateWarehouseMaterialDto();
  units: UnitNameForDropdownDto[] = [];
  materials: MaterialCodeForDropdownDto[] = [];
  suppliers: SupplierNameForDropdownDto[] = [];
  supplier: SupplierNameForDropdownDto = new SupplierNameForDropdownDto();
  warehouses: WarehouseNameForDropdownDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'PriceCanNotBeNegativeOrZero',
    },
  ];

  constructor(injector: Injector,
    private _warehouseMaterialService: WarehouseMaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _materialService: MaterialServiceProxy,
    private _warehouseService: WarehouseServiceProxy,
    private _supplierService: SupplierServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.initWarehouseMaterial();
    this.initMaterials();
    this.initWarehouses();
  }

  ngOnInit(): void { }

  initWarehouseMaterial() {
    this._warehouseMaterialService.getForEdit(this.id).subscribe((result) => {
      this.warehouseMaterial = result;
      this.getsupplierAndUnitByMaterial(result.materialId);      
    });
  }

  initUnits(materialId) {
    this._unitService.getAllForMaterial(materialId).subscribe((result) => {
      this.units = result;
    });
  }

  getsupplierAndUnitByMaterial(id: number) {
    if (id != null) {
      this._supplierService.getSuppliersByMaterialIdForDropdown(id).subscribe((result) => {
        this.suppliers = result;
      });
      this.initUnits(id);
      this.loaded = true;
    }
  }

  priceValidationErrors() {
    let errors: AbpValidationError[] = [{ name: 'min', localizationKey: 'PriceCanNotBeNegativeOrZero', propertyKey: 'PriceCanNotBeNegativeOrZero' }];
    return errors;
  }

  initMaterials() {
    this._materialService.getCodeForDropdown().subscribe((result) => {
      this.materials = result;
    });
  }

  initWarehouses() {
    this._warehouseService.getNameForDropdown().subscribe((result) => {
      this.warehouses = result;
    });
  }

  save(): void {
    this.saving = true;
    this._warehouseMaterialService
      .update(
        this.warehouseMaterial
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
