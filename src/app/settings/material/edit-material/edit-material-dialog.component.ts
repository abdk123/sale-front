import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { CreateMaterialDto, MaterialDto, MaterialServiceProxy, SupplierDto, SupplierNameForDropdownDto, SupplierServiceProxy, UpdateMaterialDto, UpdateMaterialSuppliersDto, UpdateSupplierDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-material-dialog',
  templateUrl: './edit-material-dialog.component.html',

})
export class EditMaterialDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  material = new UpdateMaterialDto();
  suppliers: SupplierNameForDropdownDto[] = [];
  supplierIds: number[] = []
  updateSupplier: UpdateMaterialSuppliersDto[] = [];
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'leadTimeCanNotBeNegativeOrZero',
    },
  ];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _supplierService: SupplierServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.material.suppliers = []
    this.initSupplier();
    this.initMaterial();
  }

  initSupplier() {
    this._supplierService.getNameForDropdown().subscribe((result: SupplierNameForDropdownDto[]) => {
      this.suppliers = result;
    });
  }
  leadTimeValidationErrors() {
    let errors: AbpValidationError[] = [{ name: 'min', localizationKey: 'leadTimeCanNotBeNegativeOrZero', propertyKey: 'leadTimeCanNotBeNegativeOrZero' }];
    return errors;
  }
  initMaterial() {
    this._materialService.get(this.id).subscribe((result: MaterialDto) => {
      this.material.id = result.id;
      this.material.name = result.name;
      this.material.code = result.code;
      this.material.description = result.description;
      result.suppliers.forEach((item) => {
        let supplier = new UpdateMaterialSuppliersDto();
        supplier.id = item.id,
          supplier.supplierId = item.supplier.id
        supplier.leadTime = item.leadTime
        this.material.suppliers.push(supplier);
      });
    });
  }

  addMaterialSupplier() {
    const index = this.material.suppliers.length;
    //list have one element at least
    if (index > 0) {
      if ((this.material.suppliers[index - 1].supplierId == null || this.material.suppliers[index - 1].leadTime == null)) {
        this.notify.error(this.l('FillSupplierAndLeadTimeFieldFirst'));
      }
      else {
        let materialSupplier = new UpdateMaterialSuppliersDto();
        materialSupplier.materialId = this.material.id;
        this.material.suppliers.push(materialSupplier);
      }
    }
    //if the list empty
    else {
      let materialSupplier = new UpdateMaterialSuppliersDto();
      materialSupplier.materialId = this.material.id;
      this.material.suppliers.push(materialSupplier);
    }
  }

  removeMaterialSupplier (i:number){
    if(i!=-1)
    {
      this.material.suppliers.splice(i,1);

    }
  }
  hasDuplicatesSuppliers() {

    var valueArr: number[] = this.material.suppliers.map(function (item) { return item.supplierId });
    var isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) !== idx
    });
    return isDuplicate;
  }

  save(): void {
    if (this.material.suppliers.length < 1) {
      this.notify.error(this.l('AddOneSupplierAtLeast'));
    }
    else {
      if (!this.hasDuplicatesSuppliers()) {
        this.saving = true;
        this.material.suppliers.forEach((element) =>
          element.id = 0);
        this._materialService.
          update(
            this.material
          )
          .pipe(
            finalize(() => {
              this.saving = false;
            })
          )
          .subscribe((result: any) => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.bsModalRef.hide();
            this.onSave.emit();
          });
      }
      else {
        this.notify.error(this.l('TheSupplierCannotBeDuplicated'));
      }
    }
    this.saving = true;
  }

}
