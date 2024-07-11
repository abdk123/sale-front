import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryNameForDropdownDto, CategoryServiceProxy,  UpdateCategoryDto,  } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
 
})
export class EditCategoryDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  category = new UpdateCategoryDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();
  parentCategories: CategoryNameForDropdownDto[] = [];

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    public _categoryService: CategoryServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.initParentCategories();
    this.initialCategory();
  }

  initParentCategories(){
    this._categoryService.getNameForDropdown()
    .subscribe(result =>{
      this.parentCategories = result;
    })
  }

  initialCategory(){
    this._categoryService.getForEdit(this.id)
    .subscribe((result: UpdateCategoryDto) => {
      this.category = result;
    });
  }

  save(): void {
    this.saving = true;  
    this._categoryService
        .update(
            this.category
        )
        .pipe(
            finalize(() => {
            this.saving = false;
            })
        )
        .subscribe(() => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        });
        
  }
  
  

}
