import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ViewProductDialogComponent } from './view-product/view-product-dialog.component';
import {  FilterDto, FullPagedRequestDto, ProductDto,ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { FilterProductDialogComponent } from './filter-product/filter-product-dialog.component';
import {  Router } from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',

})
export class ProductComponent extends FullPagedListingComponentBase<ProductDto> implements OnInit {
  products: ProductDto[] = [];
  fields = [
    { label: this.l('Name'), name: 'name', sortable: true, type: 'string' },
    { label: this.l('Size'), name: 'size', sortable: true, type: 'number' },
    { label: this.l('Price'), name: 'price', sortable: true, type: 'string' },
    { label: this.l('Category'), name: 'category', sortable: true, type: 'reference', referenceTextField: 'name' },
    { label: this.l('Description'), name: 'description', sortable: false, type: 'string'},
  ];

  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,
    private _router:Router) {
    super(injector);
  }


  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.including="Category"
    this._productService.read(request)
      .subscribe(result => {
        this.products = result.items;
        this.showPaging(result, pageNumber);
      })

  }

  showAddNewModal() {
    this._router.navigate(['app/settings/newproduct']);
  }
  showEditModal(id: any){
    this._router.navigate(['app/settings/editproduct',id]);
  }
  deleteItem(id:number): void {


    abp.message.confirm(
      this.l('ProductDeleteWarningMessage',  'Products'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._productService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );

}
showViewModal(id:number){
  this._modalService.show(
    ViewProductDialogComponent,
    {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        id: id,
      },
    }
  );

}

  showFilterDialog(status) {
    if (status == 'clear_filter') {
      this.request.filtering = undefined;
      this.refresh();
      return;
    }
    let filterDialog: BsModalRef;
    filterDialog = this._modalService.show(
      FilterProductDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          filterInput: this.request.filtering,
        },
        class: 'modal-lg',
      }
    );
    filterDialog.content.onSave.subscribe((result: FilterDto) => {
      this.request.filtering = result;
      this._modalService.hide();
      this.refresh();
    });
  }

}




