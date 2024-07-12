import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MaterialServiceProxy, UpdateMaterialDto, CategoryForDropdownDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-material-dialog',
  templateUrl: './edit-material-dialog.component.html',

})
export class EditMaterialDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  material = new UpdateMaterialDto();
  categories:CategoryForDropdownDto[]=[];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialCategories();
    this.initMaterial();
  }

  initMaterial() {
    this._materialService.getForEdit(this.id).subscribe((result: UpdateMaterialDto) => {
      this.material = result;
    });
  }

  initialCategories() {
    this._categoryService
      .getForDropdown("")
      .subscribe((result: CategoryForDropdownDto[]) => {
        this.categories = result;
      });
  }

  save(): void {
    this.saving = true;
    this._materialService
      .create(this.material)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: any) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
