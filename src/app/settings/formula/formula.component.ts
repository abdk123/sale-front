import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateFormulaDialogComponent } from './create-formula/create-formula-dialog.component';
import { EditFormulaDialogComponent } from './edit-formula/edit-formula-dialog.component';
import { ViewFormulaDialogComponent } from './view-formula/view-formula-dialog.component';
import { CreateFormulaDto, FormulaDto, FormulaDtoPagedResultDto, FormulaServiceProxy, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'formula',
  templateUrl: './formula.component.html',

})
export class FormulaComponent extends PagedListingComponentBase<FormulaDto> {
  id:number;
  displayMode = 'list';
  selectAllState = '';
  selected: FormulaDto[] = [];
   data: FormulaDto[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  itemOrder = { label: this.l("Name"), value: "name" };
  itemOptionsOrders = [
    { label: this.l("Name"), value: "name" },


  ];
  selectedCount = 0;
  isActive: boolean | null = true;
  advancedFiltersVisible = false;
 
  loading = false;
  title=this.l("Formula");
  constructor(injector: Injector,
    private _modalService: BsModalService,
    private _formulaService:FormulaServiceProxy,
    private _productService:ProductServiceProxy,
    private _route:ActivatedRoute
    ) {
    super(injector);
  }


  ngOnInit(): void {

   this._route.params.subscribe(params => {
    this.id=params['id'];
    });
    this.getFormulaById()
    // this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

   getFormulaById()
   {
    this._productService.get(this.id).subscribe((response)=>{
           this.data=response.formulas;

    })
   }
  viewButton(id:number)
{
  this._modalService.show(
    ViewFormulaDialogComponent,
    {
      backdrop: true,
      ignoreBackdropClick: true,
     
      // initialState: {
      //   id: id,
      // },
    }
  );

}


  editButton(id:number): void {
    let editFormulaDialog: BsModalRef;
        editFormulaDialog = this._modalService.show(
        EditFormulaDialogComponent,
        {
          backdrop: true,
          ignoreBackdropClick: true,
          initialState: {
            // id: id,
            productId:this.id
          },
          class: 'modal-lg',
        }
      );
      editFormulaDialog.content.onSave.subscribe(() => {
        this.getFormulaById()
      });


    }

    protected delete(entity: FormulaDto): void {
      abp.message.confirm(
        this.l('FormulaDeleteWarningMessage', this.selected.length, 'Formulas'),
        undefined,
        (result: boolean) => {
          if (result) {
            this._formulaService.delete(entity.id).subscribe(() => {
              abp.notify.success(this.l('SuccessfullyDeleted'));
              this.getFormulaById()

            });
          }
        }
      );
    }
    loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', sort_Field: string = undefined, sort_Desc: boolean = false): void {
      let request: PagedProductsRequestDto = new PagedProductsRequestDto();
      this.itemsPerPage = pageSize;
      this.currentPage = currentPage;
      this.search = search;
      request.keyword = search;
      request.sort_Field = sort_Field;
      request.sort_Desc = sort_Desc;
      request.skipCount = (currentPage - 1) * pageSize;
      request.maxResultCount = this.itemsPerPage;
      this.list(request, this.pageNumber, () => { });
    }
  deleteItem(): void {
    if (this.selected.length == 0) {
      abp.message.info(this.l('YouHaveToSelectOneItemInMinimum'));
    }
    else {
      abp.message.confirm(
        this.l('ProductDeleteWarningMessage', this.selected.length, 'Products'),
        undefined,
        (result: boolean) => {
          if (result) {
            this.selected.forEach(element => {
              this._formulaService.delete(element.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              });
            });
          }
        }
      );
    }
  }

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  showAddNewModal(): void {
    let createOrEditFormulaDialog: BsModalRef;
    createOrEditFormulaDialog = this._modalService.show(
      CreateFormulaDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          productId: this.id,
        },
       class: 'modal-lg',

      }
    );
    createOrEditFormulaDialog.content.onSave.subscribe(() => {
         this.getFormulaById()
    });
  }

  isSelected(p: FormulaDto): boolean {

    return this.selected.findIndex(x => x.id === p.id) > -1;
  }
  onSelect(item: FormulaDto): void {

    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }
  protected list(
    request: PagedProductsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.search;

    this._formulaService
      .getAll(
        request.keyword,
        request.sort_Field,
        request.skipCount,
        request.MaxResultCount,
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: FormulaDtoPagedResultDto) => {

        this.data = result.items;

        this.totalItem = result.totalCount;
        this.totalPage =  ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
        this.setSelectAllState();
      });
  }


  setSelectAllState(): void {
    if (this.selected.length === this.data.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any): void {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  }


}
class PagedProductsRequestDto extends PagedRequestDto {
  keyword: string;
  sort_Field: string;
  sort_Desc: boolean;
  MaxResultCount:number
}

