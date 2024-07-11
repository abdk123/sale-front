import { Component, OnInit } from '@angular/core';
import { CategoryDto, CategoryServiceProxy, MaterialDto, MaterialNameForDropdownDto, MaterialServiceProxy, ProductDto, ProductServiceProxy, UnitDto, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-product-dialog',
  templateUrl: './view-product-dialog.component.html',
})
export class ViewProductDialogComponent implements OnInit {

  data :ProductDto=new ProductDto();
  id: number;
  loaded=false;
  // category=new CategoryDto();
  editable: true;
  constructor(public bsModalRef: BsModalRef,
    // public _categoryService :CategoryServiceProxy,
    private _productService:ProductServiceProxy){}
  ngOnInit(): void {
    this.initProduct();

  }

  initProduct()
  {
     this._productService.get(this.id).subscribe((result)=>{
      this.data=result;
      console.log(result)
      this.loaded=true;
     });
  }



}
