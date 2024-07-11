
import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryNameForDropdownDto, CategoryServiceProxy, FormulaDto, MaterialCodeForDropdownDto, MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductDto, ProductServiceProxy, UnitNameForDropdownDto, UnitServiceProxy, UpdateProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
@Component({
  selector: 'edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',

})
export class EditProductDialogComponent extends AppComponentBase {
  saving = false;
  product :UpdateProductDto=new UpdateProductDto();
  formulas:FormulaDto[]=[];
  materials: MaterialCodeForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  categories : CategoryNameForDropdownDto[] = [];
  id:number
  loaded=false;
  @Output() onSave = new EventEmitter<any>();
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'PriceCanNotBeNegativeOrZero',
    },
  ];
  constructor(injector: Injector,
    private _productService:ProductServiceProxy,
    public bsModalRef: BsModalRef,
    private _materialService:MaterialServiceProxy,
    private _unitService:UnitServiceProxy,
    private _location: Location,
    private _route:ActivatedRoute,
    public _categoryService :CategoryServiceProxy,

  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];

    })
    this.initCategory();
    this.initProduct();

  }
  initCategory()
  {
    this._categoryService.getNameForDropdown().subscribe((result) => {
      this.categories = result;
    });
  }
  initProduct()
  {
    this._productService.get(this.id).subscribe((response:ProductDto)=>{
      this.product=response;
       (response)
      this.loaded=true
    });
  }
  priceValidationErrors(){
    let errors: AbpValidationError[] = [{name:'min',localizationKey:'PriceCanNotBeNegativeOrZero',propertyKey:'PriceCanNotBeNegativeOrZero'}];
    return errors;
  }
  backToAllProduct(){
    this._location.back();

  }
  initMaterials() {
    this._materialService.getCodeForDropdown().subscribe((response:MaterialCodeForDropdownDto[]) => {
      this.materials = response;
    });
  }
  addFormula(items: FormulaDto[]) {
    this.product.formulas = [...items];
  }
  initUnits() {
    this._unitService.getNameForDropdown().subscribe((response:UnitNameForDropdownDto[]) => {
      this.units = response;
    });
  }

  save(): void {
    if (this.product.formulas.length < 1) {
      this.notify.error(this.l('AddOneFormulaAtLeast'));
    }
    else if(this.product.name==null || this.product.price==null )
    {
      this.notify.error(this.l('PleaseEnterTheRequiredFiled'));
    }
    else {

        this.saving = true;
        this.product.formulas.forEach((element) =>
        element.id = 0
      );
        this._productService
          .update(
            this.product
          )
          .pipe(
            finalize(() => {
              this.saving = false;
            })
          )
          .subscribe((response: any) => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.backToAllProduct()
            this.onSave.emit();
          });
      }




  }

}
