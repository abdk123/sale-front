import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
  CreateWarehouseMaterialDto, WarehouseMaterialServiceProxy,
  UnitServiceProxy, UnitNameForDropdownDto,
  MaterialServiceProxy, WarehouseServiceProxy, SupplierNameForDropdownDto,
  SupplierServiceProxy, WarehouseNameForDropdownDto, MaterialCodeForDropdownDto
} from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  selector: 'create-warehouse-material-dialog',
  templateUrl: './create-warehouse-material-dialog.component.html',
})

export class CreateWarehouseMaterialDialogComponent extends AppComponentBase {
  saving = false;
  warehouseMaterial = new CreateWarehouseMaterialDto();
  units: UnitNameForDropdownDto[] = [];
  materials: MaterialCodeForDropdownDto[] = [];
  suppliers: SupplierNameForDropdownDto[] = [];
  warehouses: WarehouseNameForDropdownDto[] = [];
  minDate: Date;
  maxDate: Date;
  loaded: boolean = false;
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

  ngOnInit(): void {
    this.suppliers = []
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.initMaterials();
    this.initWarehouses();
  }

  initUnits(materialId) {
    this._unitService.getAllForMaterial(materialId).subscribe((result) => {
      this.units = result;
    });
  }

  initSuppliers(id: number) {
    this._supplierService.getSuppliersByMaterialIdForDropdown(id).subscribe((result) => {
      this.suppliers = result;
    });
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

  getSuppliersAndUnitsByMaterial(id: number) {
    if (id != null) {
      this.initSuppliers(id);
      this.initUnits(id);
      this.loaded = true;
    }
  }

  initWarehouses() {
    this._warehouseService.getNameForDropdown().subscribe((result) => {
      this.warehouses = result;
    });
  }

  save(): void {
    this.saving = true;
    this._warehouseMaterialService.
      create(
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
