import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanDto, PlanProductDto, PlanServiceProxy, ProductDto, ProductDtoPagedResultDto, ProductInfoDropdownDto, ProductServiceProxy, UpdatePlanDto, UpdatePlanProductDto } from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'edit-plan-product-dialog',
  templateUrl: './edit-plan-product-dialog.component.html',

})
export class EditPlanProductDialogComponent extends AppComponentBase {
  saving = false;
  loaded = false;
  products: ProductDto[] = [];
  productsForDropDown: ProductInfoDropdownDto[] = [];
  productId: number;
  product: ProductDto = new ProductDto();
  planProduct: PlanProductDto = new PlanProductDto();
  data: PlanProductDto[] = [];
  plan: PlanDto = new PlanDto();
  ColumnMode = ColumnMode;
  isButtonDisabled = false;
  @Input() planId: number;
  @Output() savePlanProductList = new EventEmitter<PlanProductDto[]>();

  constructor(injector: Injector,
    private _productService: ProductServiceProxy,
    private _planService: PlanServiceProxy,
    public bsModalRef: BsModalRef,


  ) {
    super(injector);
  }
  ngOnInit(): void {
   
    this.initPlan();
    this.initProducts();
    this.initProductsDropDown();

  }

  initProductsDropDown() {
    this._productService.getNameForDropdown().subscribe((response) => {
      this.productsForDropDown = response;
    });
  }
  initProducts() {

    // this._productService.getAll("","",undefined,'',0,1000).subscribe((response) => {
    //   var result = response as ProductDtoPagedResultDto;
    //   this.products = result.items;

    // });

  }
  initPlan() {
    this._planService.get(this.planId).subscribe((response: PlanDto) => {
      this.plan = response;
    })

  }

  getProductName(id: number):ProductDto {
    let p=new ProductDto();
    this._productService.get(id).subscribe((response) => {
      p=response;
    });
return p;
  }

  addToProductList() {
    this.planProduct.product=new ProductDto();
    this.isButtonDisabled = false;
    if (this.planProduct.numberOfItems == null || this.planProduct.productId == null) {
      return;
    }
    else {
      if (this.planProduct.id == null) {
        this.planProduct.planId = this.planId;
        var product = this.productsForDropDown.filter(x => x.id == this.planProduct.productId)[0];
        this.planProduct.product.id= product.id;
        this.planProduct.product.name= product.information;
        if (this.plan.planProducts.filter(x => x.product.id == this.planProduct.product.id).length > 0) {
          this.notify.error(this.l('ProductIsAlreadyExist'));
          return;
        }
        this.plan.planProducts.push(this.planProduct)
        this.planProduct = new PlanProductDto()
        this.plan.planProducts = [...this.plan.planProducts];
        this.savePlanProductList.emit(this.plan.planProducts);
        this.saving = true;
      }
      else {
        if (this.plan.planProducts.filter(x => x.product.id == this.planProduct.productId).length > 0) {
          this.notify.error(this.l('ProductIsAlreadyExist'));
          return;
        }
        let product = this.productsForDropDown.filter(x => x.id == this.planProduct.productId)[0];
        this.planProduct.product.id = product.id;
        this.planProduct.product.name = product.information;
        this.plan.planProducts.push(this.planProduct)
        this.data.push(this.planProduct)
        this.planProduct = new PlanProductDto();
        this.plan.planProducts = [...this.plan.planProducts]
        this.savePlanProductList.emit(this.plan.planProducts);
        (this.savePlanProductList)
        this.saving = true;
      }
    }
  }


  edit(row: PlanProductDto) {
    this.isButtonDisabled = true;
    this.planProduct = new PlanProductDto();
    this.planProduct = row
    const index = this.plan.planProducts.indexOf(row);
    if (index !== -1) {
      this.plan.planProducts.splice(index, 1);
    }
  }

  delete(row: PlanProductDto) {
    const index = this.plan.planProducts.indexOf(row);
    if (index !== -1) {
      this.plan.planProducts.splice(index, 1);
      (this.plan.planProducts)
      this.savePlanProductList.emit(this.plan.planProducts);
    }


  }

}
