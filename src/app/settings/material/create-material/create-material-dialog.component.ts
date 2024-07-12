import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { AbpValidationError } from "@shared/components/validation/abp-validation.api";
import {
  CreateMaterialDto,
  MaterialServiceProxy,
  CustomerServiceProxy,
  CategoryDto,
  CategoryServiceProxy,
  CategoryForDropdownDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";

@Component({
  selector: "create-material-dialog",
  templateUrl: "./create-material-dialog.component.html",
})
export class CreateMaterialDialogComponent extends AppComponentBase {
  saving = false;
  material = new CreateMaterialDto();
  categories: CategoryForDropdownDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialCategories();
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
