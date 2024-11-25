import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  MaterialServiceProxy,
  UpdateMaterialDto,
  CategoryForDropdownDto,
  CategoryServiceProxy,
  SizeForDropdownDto,
  StoreForDropdownDto,
  UpdateStockDto,
  SizeServiceProxy,
  StoreServiceProxy,
  UnitServiceProxy,
  UnitDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

export class ClassUnit {
  unitId: number | undefined;
  stockId: number | undefined;
  name: string | undefined;
}

@Component({
  selector: "edit-material-dialog",
  templateUrl: "./edit-material-dialog.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class EditMaterialDialogComponent extends AppComponentBase {
  saving = false;
  material = new UpdateMaterialDto();
  categories: CategoryForDropdownDto[] = [];
  stock: UpdateStockDto = new UpdateStockDto();
  stocks: UpdateStockDto[] = [];
  stores: StoreForDropdownDto[] = [];
  sizes: SizeForDropdownDto[] = [];
  units: UnitDto[] = [];
  expiryDate: Date;
  categoryIsRequired = false;
  unitIsRequired = false;
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _storeService: StoreServiceProxy,
    private _sizeService: SizeServiceProxy,
    private _unitService: UnitServiceProxy,
    private _router: Router,
    private _route: ActivatedRoute,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.id = this._route.snapshot?.params?.id;
    this.initialCategories();
    this.initialStores();
    this.initialUnits();
    this.initialSizes();
    setTimeout(()=>{
      this.initMaterial();
    },500);
  }

  initMaterial() {
    this._materialService
      .getForEdit(this.id)
      .subscribe((result: UpdateMaterialDto) => {
        this.material = result;
      });
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
        this.units = result?.items;
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

  save(): void {
    this.categoryIsRequired = this.material.categoryId ? false : true;
    if (!this.categoryIsRequired) {
      this.saving = true;
      this._materialService
        .update(this.material)
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
    this.stock.materialId = this.id;
    this.material.stocks.push(this.stock);

    //reset stock
    this.stock = new UpdateStockDto();
  }

  updateStock() {
    this.material.stocks.find(x=>x.id == this.stock.id).storeId = this.stock.storeId;
    this.material.stocks.find(x=>x.id == this.stock.id).conversionValue = this.stock.conversionValue;
    this.material.stocks.find(x=>x.id == this.stock.id).quantity = this.stock.quantity;
    this.material.stocks.find(x=>x.id == this.stock.id).materialId = this.stock.materialId;
    this.material.stocks.find(x=>x.id == this.stock.id).sizeId = this.stock.sizeId;
    
    //reset stock
    this.stock = new UpdateStockDto();
  }

  initStock(item){
    this.stock = item;
  }
  resetStock(){
    this.stock = new UpdateStockDto();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  getNumberInSmallUnit(item){
    const value = item.quantity * item.conversionValue;
    return value;
  }

  deleteStock(index) {
    this.material.stocks.splice(index,1);
  }
}
