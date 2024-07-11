import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreatePlanProductDto, PlanProductDto, ProductDto, ProductInfoDropdownDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'create-plan-product-dialog',
  templateUrl: './create-plan-product-dialog.component.html',

})
export class CreatePlanProductDialogComponent extends AppComponentBase {
  saving = false;
  products: ProductDto[] = [];
  productsForDropDown: ProductInfoDropdownDto[] = [];
  productId: number;
  product:ProductDto=new ProductDto();
  planProduct:CreatePlanProductDto=new CreatePlanProductDto();
  data: CreatePlanProductDto[] = [];
  ColumnMode = ColumnMode;
  saveDisabled = true
  isButtonDisabled = false;
  @Output() savePlanProductList = new EventEmitter<CreatePlanProductDto[]>();
  constructor(injector: Injector,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {

    this.initProducts();

  }


  initProducts() {
    this._productService.getNameForDropdown().subscribe((response: ProductInfoDropdownDto[]) => {
      this.productsForDropDown = response;


    });
  }

  getMaterialName(id:number){
    this._productService.get(id).subscribe((response)=>{
      this.products.push(response);
    });
  }

  addToProductList()
  {
    this.isButtonDisabled = false;
    if(this.planProduct.numberOfItems ==null || this.planProduct.productId == null){
      return;
    }
    else{
      if(this.data.filter(x=>x.productId ==this.planProduct.productId).length >0){
        this.notify.error(this.l('ProductIsAlreadyExist'));
        return;
      }
    this.getMaterialName(this.planProduct.productId)
    this.data.push(this.planProduct)
    this.planProduct = new PlanProductDto()
    this.data = [...this.data]
    this.savePlanProductList.emit(this.data);
    this.saving = true;
    }

  }

  edit(row: PlanProductDto) {

    this.isButtonDisabled = true;
    this.planProduct = row
      const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  delete(row: PlanProductDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.savePlanProductList.emit(this.data);
    }

  }

}

