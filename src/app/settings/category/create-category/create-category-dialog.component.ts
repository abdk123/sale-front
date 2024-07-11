import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateCategoryDto, CategoryNameForDropdownDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
})
export class CreateCategoryDialogComponent extends AppComponentBase {
  saving = false;
  category = new CreateCategoryDto();
  parentCategories: CategoryNameForDropdownDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void { 
    this.initialParentCategories();
  }

  initialParentCategories(){
    this._categoryService.getNameForDropdown() 
    .subscribe((result)=>{
      this.parentCategories = result});
  }

  save(): void {
    this.saving = true;
    this._categoryService.
      create(
        this.category
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        (response);
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
