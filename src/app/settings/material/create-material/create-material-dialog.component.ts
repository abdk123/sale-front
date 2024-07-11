import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { CreateMaterialDto, CreateMaterialSuppliersDto, MaterialServiceProxy, SupplierDto, SupplierNameForDropdownDto, SupplierServiceProxy, UpdateMaterialSuppliersDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-material-dialog',
  templateUrl: './create-material-dialog.component.html',

})
export class CreateMaterialDialogComponent extends AppComponentBase {
  saving = false;
  material = new CreateMaterialDto();
  suppliers: SupplierNameForDropdownDto[] = [];
  materialSuppliers: CreateMaterialSuppliersDto[] = [];
  supplierList: SupplierNameForDropdownDto[] = [];
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
  }
  leadTimeValidationErrors(){
    let errors: AbpValidationError[] = [{name:'min',localizationKey:'leadTimeCanNotBeNegativeOrZero',propertyKey:'leadTimeCanNotBeNegativeOrZero'}];
    return errors;
  }
  initSupplier() {

    this._supplierService.getNameForDropdown().subscribe((result: SupplierNameForDropdownDto[]) => {
      this.suppliers = result;

    });
  }
  hasDuplicatesSuppliers(){
  var valueArr = this.material.suppliers.map(function(item){ return item.supplierId });
  var isDuplicate = valueArr.some(function(item, idx){ 
    return valueArr.indexOf(item) != idx 
    });
    return isDuplicate;
  }
  addMaterialSupplier() {
    const index = this.material.suppliers.length ;
    //list have one element at least
    if(index>0)
    {
      if ((this.material.suppliers[index-1].supplierId == null || this.material.suppliers[index-1].leadTime == null) ) {
        this.notify.error(this.l('FillSupplierAndLeadTimeFieldFirst'));
      }
      else{
        let materialSupplier = new CreateMaterialSuppliersDto();
        this.material.suppliers.push(materialSupplier);
      }
    }
    //if the list empty 
    else
    {
      let materialSupplier = new CreateMaterialSuppliersDto();
      this.material.suppliers.push(materialSupplier);
    }
  }
  removeMaterialSupplier(i: number) {
    this.material.suppliers.splice(i, 1);
  }

  save(): void {

    if (this.material.suppliers.length < 1) {
      this.notify.error(this.l('AddOneSupplierAtLeast'));
    }
    else {
      if(!this.hasDuplicatesSuppliers()){
        this.saving = true;
        this._materialService.
          create(
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


  }

}
