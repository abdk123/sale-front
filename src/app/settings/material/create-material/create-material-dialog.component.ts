import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateMaterialDto,
  MaterialServiceProxy,
  CategoryServiceProxy,
  CategoryForDropdownDto,
  CreateStockDto,
  StoreForDropdownDto,
  StoreServiceProxy,
  SizeServiceProxy,
  SizeForDropdownDto,
  UnitServiceProxy,
  CreateUnitDto,
  StockServiceProxy,
  UnitDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";

@Component({
  selector: "create-material-dialog",
  templateUrl: "./create-material-dialog.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class CreateMaterialDialogComponent extends AppComponentBase {
  saving = false;
  material = new CreateMaterialDto();
  categories: CategoryForDropdownDto[] = [];
  stock: CreateStockDto = new CreateStockDto();
  stocks: CreateStockDto[] = [];
  stores: StoreForDropdownDto[] = [];
  sizes: SizeForDropdownDto[] = [];
  units: UnitDto[] = [];
  expiryDate: Date;
  categoryIsRequired = false;
  unitIsRequired = false;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _storeService: StoreServiceProxy,
    private _sizeService: SizeServiceProxy,
    private _unitService: UnitServiceProxy,
    private _router: Router,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialCategories();
    this.initialStores();
    this.initialUnits();
    this.initialSizes();
  }

  initialCategories() {
    this._categoryService
      .getAllForDropdown()
      .subscribe((result: CategoryForDropdownDto[]) => {
        this.categories = result;
      });
  }

  initialStores() {
    this._storeService
      .getForDropdown()
      .subscribe((result: StoreForDropdownDto[]) => {
        this.stores = result;
      });
  }

  initialSizes() {
    this._sizeService
      .getForDropdown()
      .subscribe((result: SizeForDropdownDto[]) => {
        this.sizes = result;
      });
  }

  initialUnits() {
    this._unitService
      .getAll(undefined, undefined, undefined, undefined, undefined, 0, 10000)
      .subscribe((result) => {
        this.units = result.items;
      });
  }

  getStoreName(storeId) {
    return this.stores.find((x) => x.id == storeId).name;
  }

  getSizeName(sizeId) {
    return this.sizes.find((x) => x.id == sizeId).name;
  }

  getUnitName() {
    return this.units.find(x=>x.id == this.material.unitId).name;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  save(): void {
    this.categoryIsRequired = this.material.categoryId ? false : true;
    if (!this.categoryIsRequired) {
      this.saving = true;
      this._materialService
        .create(this.material)
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((result) => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this._router.navigate(["/app/settings/material"]);
          this.onSave.emit();
        });
    }
  }

  addStock() {
    if (this.material.stocks == undefined) 
      this.material.stocks = [];
    this.material.stocks.push(this.stock);
    //reset stock
    this.stock = new CreateStockDto();

  }

  getNumberInSmallUnit(item){
    const value = item.quantity * item.conversionValue;
    return value;
  }
  deleteStock(index) {
    this.material.stocks.splice(index,1);
  }
}
