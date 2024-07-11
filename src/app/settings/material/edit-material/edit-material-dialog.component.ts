import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { CreateMaterialDto, MaterialDto, MaterialServiceProxy, CustomerDto, CustomerNameForDropdownDto, CustomerServiceProxy, UpdateMaterialDto, UpdateMaterialCustomersDto, UpdateCustomerDto } from '@shared/service-proxies/service-proxies';
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
  customers: CustomerNameForDropdownDto[] = [];
  customerIds: number[] = []
  updateCustomer: UpdateMaterialCustomersDto[] = [];
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
    this.initMaterial();
  }

  initCustomer() {
    this._customerService.getNameForDropdown().subscribe((result: CustomerNameForDropdownDto[]) => {
      this.customers = result;
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
      result.customers.forEach((item) => {
        let customer = new UpdateMaterialCustomersDto();
        customer.id = item.id,
          customer.customerId = item.customer.id
        customer.leadTime = item.leadTime
        this.material.customers.push(customer);
      });
    });
  }

  addMaterialCustomer() {
    const index = this.material.customers.length;
    //list have one element at least
    if (index > 0) {
      if ((this.material.customers[index - 1].customerId == null || this.material.customers[index - 1].leadTime == null)) {
        this.notify.error(this.l('FillCustomerAndLeadTimeFieldFirst'));
      }
      else {
        let materialCustomer = new UpdateMaterialCustomersDto();
        materialCustomer.materialId = this.material.id;
        this.material.customers.push(materialCustomer);
      }
    }
    //if the list empty
    else {
      let materialCustomer = new UpdateMaterialCustomersDto();
      materialCustomer.materialId = this.material.id;
      this.material.customers.push(materialCustomer);
    }
  }

  removeMaterialCustomer (i:number){
    if(i!=-1)
    {
      this.material.customers.splice(i,1);

    }
  }
  hasDuplicatesCustomers() {

    var valueArr: number[] = this.material.customers.map(function (item) { return item.customerId });
    var isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) !== idx
    });
    return isDuplicate;
  }

  save(): void {
    if (this.material.customers.length < 1) {
      this.notify.error(this.l('AddOneCustomerAtLeast'));
    }
    else {
      if (!this.hasDuplicatesCustomers()) {
        this.saving = true;
        this.material.customers.forEach((element) =>
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
        this.notify.error(this.l('TheCustomerCannotBeDuplicated'));
      }
    }
    this.saving = true;
  }

}
