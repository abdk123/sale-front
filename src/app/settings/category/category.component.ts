import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FullPagedListingComponentBase } from '@shared/full-paged-listing-component-base';
import { CategoryDto, CategoryServiceProxy, FilterDto, FullPagedRequestDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilterCategoryDialogComponent } from './filter-category/filter-category-dialog.component';
import { CreateCategoryDialogComponent } from './create-category/create-category-dialog.component';
import { EditCategoryDialogComponent } from './edit-category/edit-category-dialog.component';
import { ViewCategoryDialogComponent } from './view-category/view-category-dialog.component';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
})
export class CategoryComponent extends FullPagedListingComponentBase<CategoryDto> implements OnInit {
  categories: CategoryDto[] = [];
  fields = [
    { label: this.l('Name'), name: 'name', sortable: true, type: 'string' },
    { label: this.l('Description'), name: 'description', sortable: false, type: 'string' },
    { label: this.l('ParentCategory'), name: 'parentCategory', sortable: true, type: 'reference', referenceTextField: 'name' },

  ];
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injector);
  }
  protected list(request: FullPagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.including = "ParentCategory";
    this._categoryService.read(request)
      .subscribe(result => {
        this.categories = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  showAddNewModal() {
    let createCategoryDialog: BsModalRef;
    createCategoryDialog = this._modalService.show(
      CreateCategoryDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
      }
    );
    createCategoryDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  showEditModal(id: any){
    let editCategoryDialog: BsModalRef;
    editCategoryDialog = this._modalService.show(
      EditCategoryDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        initialState:{
          id:id
        }
      }
    );
    editCategoryDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  deleteItem(id:number): void {
    abp.message.confirm(
      this.l('CategoryDeleteWarningMessage',  'Categories'),
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoryService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
}

showViewModal(id:number){
  this._modalService.show(
    ViewCategoryDialogComponent,
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
      FilterCategoryDialogComponent,
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




