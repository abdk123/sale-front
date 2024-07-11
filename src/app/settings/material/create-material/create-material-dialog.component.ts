import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { CreateMaterialDto, CreateMaterialCustomersDto, MaterialServiceProxy, CustomerDto, CustomerNameForDropdownDto, CustomerServiceProxy, UpdateMaterialCustomersDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-material-dialog',
  templateUrl: './create-material-dialog.component.html',

})
export class CreateMaterialDialogComponent extends AppComponentBase {
  saving = false;
  material = new CreateMaterialDto();
  customers: CustomerNameForDropdownDto[] = [];
  materialCustomers: CreateMaterialCustomersDto[] = [];
  customerList: CustomerNameForDropdownDto[] = [];
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'leadTimeCanNotBeNegativeOrZero',
    },
  ];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _customerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.material.customers = []
    this.initCustomer();
  }
  leadTimeValidationErrors(){
    let errors: AbpValidationError[] = [{name:'min',localizationKey:'leadTimeCanNotBeNegativeOrZero',propertyKey:'leadTimeCanNotBeNegativeOrZero'}];
    return errors;
  }
  initCustomer() {

    this._customerService.getNameForDropdown().subscribe((result: CustomerNameForDropdownDto[]) => {
      this.customers = result;

    });
  }
  hasDuplicatesCustomers(){
  var valueArr = this.material.customers.map(function(item){ return item.customerId });
  var isDuplicate = valueArr.some(function(item, idx){ 
    return valueArr.indexOf(item) != idx 
    });
    return isDuplicate;
  }
  addMaterialCustomer() {
    const index = this.material.customers.length ;
    //list have one element at least
    if(index>0)
    {
      if ((this.material.customers[index-1].customerId == null || this.material.customers[index-1].leadTime == null) ) {
        this.notify.error(this.l('FillCustomerAndLeadTimeFieldFirst'));
      }
      else{
        let materialCustomer = new CreateMaterialCustomersDto();
        this.material.customers.push(materialCustomer);
      }
    }
    //if the list empty 
    else
    {
      let materialCustomer = new CreateMaterialCustomersDto();
      this.material.customers.push(materialCustomer);
    }
  }
  removeMaterialCustomer(i: number) {
    this.material.customers.splice(i, 1);
  }

  save(): void {

    if (this.material.customers.length < 1) {
      this.notify.error(this.l('AddOneCustomerAtLeast'));
    }
    else {
      if(!this.hasDuplicatesCustomers()){
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
        this.notify.error(this.l('TheCustomerCannotBeDuplicated'));
      }
  
    }


  }

}
