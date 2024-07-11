import { Component, EventEmitter, Injector, Output, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { OutputRequestMaterialDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanProductDto, PlanProductMaterialDto, PlanServiceProxy, ProductDto, ProductInfoDropdownDto, ProductServiceProxy, UpdateOutputRequestDto, UpdateOutputRequestProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';
import { element } from 'protractor';
@Component({
  selector: 'edit-output-request-dialog',
  templateUrl: './edit-output-request-dialog.component.html',
  styleUrls: ['./edit-output-request-dialog.component.scss']
})
export class EditOutputRequestDialogComponent extends AppComponentBase implements AfterViewInit {
  saving = false;
  planProductloaded = false;
  outputRequest: UpdateOutputRequestDto = new UpdateOutputRequestDto();
  plans: PlanNameForDropdownDto[] = [];
  selectedOutputRequestProducts: ProductInfoDropdownDto[] = [];
  planProducts: ProductInfoDropdownDto[] = [];
  id: number;
  showItemIndex = 0;
  products: ProductDto[] = [];
  allProducts :  ProductInfoDropdownDto[] = [];
  loadMaterialView: boolean = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _outputRequestService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,
    private _planService: PlanServiceProxy,
    private _productService: ProductServiceProxy,
    private _router: ActivatedRoute,
    private _location: Location
  ) {
    super(injector);
  }
  ngAfterViewInit(): void {
    this.allProducts=[]
    this._router.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.initProduct();
    this.initPlan();
    
  }
  ngOnInit(): void {
    
  }
  backToAlloutputRequest() {
    this._location.back();
  }
  onChangeOutputRequestProducts(items) {

    this.selectedOutputRequestProducts = items;

  }
  addOutputRequestMaterial(items: OutputRequestMaterialDto[]) {
    debugger;
    this.outputRequest.outputRequestMaterials = [...items];
  }

  initOutputRequest(id) {
    this.selectedOutputRequestProducts = [];
    this._outputRequestService.getForEdit(id).subscribe((result) => {
      this.outputRequest = result;
      this.onChangePlan(result.planId);
      result.outputRequestProducts.forEach(element => {
      this.getSelectedProduct(element.productId);

      });
      this.planProductloaded=true;
      this.loadMaterialView = true;
    });

  }
  initPlan() {
    this._planService.getActualPlansNameForDropdown().subscribe((result) => {
      this.plans = result;
    });
  }
  getSelectedProduct(id){
    const prod = this.allProducts.find(x => x.id == id);
    if (prod) {
      var selectedProduct = new ProductInfoDropdownDto();
       selectedProduct.init({ id: prod.id, information: prod.information });
      this.selectedOutputRequestProducts.push(selectedProduct);

    }
  }
    initProduct(){
    this._productService.getNameForDropdown().subscribe((result) => {
    this.allProducts=result;
    this.initOutputRequest(this.id);
    });
}


  onChangePlan(id: number) {
    if (id != null) {
      this._planService.getProductsOfPlan(id).subscribe((result) => {
        this.planProducts = result;
      });
    }
  }

 addProduct(product) {
    const tempObj = this.selectedOutputRequestProducts.find(x => x.id == product.id);
    if (!tempObj ) {
      this.selectedOutputRequestProducts.push(product);
    }
  }
  onRemoveallProducts()
  {
    this.selectedOutputRequestProducts = [];

  }
  onRemoveProduct(product){

    const tempObj = this.selectedOutputRequestProducts.findIndex(x => x.id == product.id);
    if (tempObj!=-1 ) {
      this.selectedOutputRequestProducts.splice(tempObj,1);

    }
  }
  save(): void {
    debugger;
      if (this.outputRequest.outputRequestMaterials.length < 1) {
      this.notify.error(this.l('AddOneOutputRequestMaterialAtLeast'));
      }
      else if(this.outputRequest.title==null || this.outputRequest.planId==null || this.outputRequest.outputRequestProducts.length<1 )
      {
        this.notify.error(this.l('PleaseEnterTheRequiredFiled'));
      }
      else{
      this.saving = true;
      this.outputRequest.outputRequestProducts=[]
      this.selectedOutputRequestProducts.forEach(obj1 => {
          var selectProduct=new UpdateOutputRequestProductDto()
          selectProduct.init({id:0,productId:obj1.id})
          this.outputRequest.outputRequestProducts.push(selectProduct);
      });
      this._outputRequestService
        .update(
          this.outputRequest
        )
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((response: any) => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.onSave.emit();
          this.backToAlloutputRequest();
        });
    }
  }


  onChangeOutputRequestProduct(items: PlanProductDto[]){
    this.outputRequest.outputRequestProducts = [];
    items.forEach(item=>{
      var outputRequestProduct = new UpdateOutputRequestProductDto();
      outputRequestProduct.init({
        // id: item.id,
        productId: item.id
      });
      this.outputRequest.outputRequestProducts.push(outputRequestProduct);
    });
  }

  onCloseSelect(){    
    if(this.loadMaterialView == true){
      this.loadMaterialView = false;
    setTimeout(()=>{
      this.loadMaterialView = true;
    },1);
    }else{
      this.loadMaterialView = true;
    }
  }

  onRemoveFromSelect(){
    if(this.outputRequest.outputRequestProducts.length != 0){
      this.loadMaterialView = false;
    setTimeout(()=>{
      this.loadMaterialView = true;
    },1);
    }else{
      this.loadMaterialView = false;
    }    
  }

  onClearSelect(){
    this.loadMaterialView = false;
  }

}
