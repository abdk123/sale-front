import { Component, OnInit } from "@angular/core";
import {
  MaterialDto,
  MaterialServiceProxy,
  CategoryDto,
  CategoryServiceProxy,
  UpdateStockDto,
  StockServiceProxy,
  UnitServiceProxy,
  SizeForDropdownDto,
  StoreForDropdownDto,
  StoreServiceProxy,
  SizeServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

export class UnitClass{
  id: number | undefined;
  name: string | undefined
}

@Component({
  selector: "view-material-dialog",
  templateUrl: "./view-material-dialog.component.html",
})
export class ViewMaterialDialogComponent implements OnInit {
  data = new MaterialDto();
  category = new CategoryDto();
  id: number;
  editable: true;
  stocks: UpdateStockDto[] = [];
  units: UnitClass[] = [];
  stores: StoreForDropdownDto[] = [];
  sizes: SizeForDropdownDto[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private _materialService: MaterialServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _stockService: StockServiceProxy,
    private _unitService: UnitServiceProxy,
    private _storeService: StoreServiceProxy,
    private _sizeService: SizeServiceProxy
  ) {}

  ngOnInit(): void {
    this.initMaterial();
    this.initialStores();
    this.initialSizes();
  }

  initialStocks(materialId) {
    this._stockService.getAllByMaterialId(materialId).subscribe((result) => {
      this.stocks = result;

      this.stocks.forEach((item) => {
        this._unitService.get(item.unitId).subscribe((res) => {

          const unitClass = new UnitClass();
          unitClass.id = item.id;
          unitClass.name = res.name;

          this.units.push(unitClass);
        });
      });
    });
  }

  initMaterial() {
    this._materialService.get(this.id).subscribe((response) => {
      this.data = response;
      this.initialCategory(this.data.categoryId);
      this.initialStocks(response.id);
    });
  }

  initialCategory(categoryId: number) {
    this._categoryService.get(categoryId).subscribe((result) => {
      this.category = result;
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

  getStoreName(storeId) {
    return this.stores.find((x) => x.id == storeId).name;
  }

  getSizeName(sizeId) {
    return this.sizes.find((x) => x.id == sizeId).name;
  }

  getUnitName(stockId) {
    return this.units.find((x)=>x.id == stockId).name;
  }
}
