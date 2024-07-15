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
  UpdateUnitDto,
  SizeServiceProxy,
  StockServiceProxy,
  StoreServiceProxy,
  UnitServiceProxy,
  UnitDto,
  StockDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { UnitClass } from "../view-material/view-material-dialog.component";

export class ClassUnit{
  unitId: number | undefined;
  stockId: number | undefined;
  name: string | undefined;
}

@Component({
  selector: "edit-material-dialog",
  templateUrl: "./edit-material-dialog.component.html",
})
export class EditMaterialDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  material = new UpdateMaterialDto();
  categories: CategoryForDropdownDto[] = [];
  stock: UpdateStockDto = new UpdateStockDto();
  stocks: UpdateStockDto[] = [];
  stores: StoreForDropdownDto[] = [];
  sizes: SizeForDropdownDto[] = [];
  unit: string = "";
  units: ClassUnit[] = [];
  allUnits: UnitDto[] = [];
  expiryDate: Date;
  deletedStocksIds: number[] = [];

  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _categoryService: CategoryServiceProxy,
    private _storeService: StoreServiceProxy,
    private _sizeService: SizeServiceProxy,
    private _stockService: StockServiceProxy,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initMaterial();
    this.initialCategories();
    this.initialStores();
    this.initialSizes();
  }

  initialStocks(materialId) {
    this._stockService.getAllByMaterialId(materialId).subscribe((result) => {
      this.stocks = result;

      this.stocks.forEach((item) => {
        this._unitService.get(item.unitId).subscribe((res) => {
          const unitClass = new ClassUnit();
          unitClass.stockId = item.id;
          unitClass.name = res.name;
          unitClass.unitId = res.id;

          this.units.push(unitClass);
        });
      });
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

  getStoreName(storeId) {
    return this.stores.find((x) => x.id == storeId).name;
  }

  getSizeName(sizeId) {
    return this.sizes.find((x) => x.id == sizeId).name;
  }

  getUnitName(stockId, unitId) {
    return this.units.find((x) => {
      return (x.stockId === stockId && x.unitId === unitId)
    }).name;
  }

  initMaterial() {
    this._materialService
      .getForEdit(this.id)
      .subscribe((result: UpdateMaterialDto) => {
        this.material = result;
        this.initialStocks(result.id);
      });
  }

  save(): void {
    this.saving = true;
    this._materialService
      .update(this.material)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        })
      )
      .subscribe((result: any) => {
        this.stocks.forEach((item) => {
          if (item.id === undefined) {
            item.materialId = result.id;
            this._stockService.create(item).subscribe((res) => {});
          }
        });

        this.deletedStocksIds.forEach((id) => {
          this._stockService.delete(id).subscribe((result) => {});
        });
      });
  }

  AddStock() {
    this._unitService
      .create(
        new UpdateUnitDto({
          id: undefined,
          name: this.unit,
        })
      )
      .subscribe((result) => {
        const unitClass = new ClassUnit();
        unitClass.name = this.unit;
        unitClass.unitId = result.id;
        this.units.push(unitClass);

        const stock = new StockDto(this.stock);
        stock.quantityInLargeUnit = Math.round(
          this.stock.numberInLargeUnit * this.stock.count
        );
        stock.totalNumberInSmallUnit =
          stock.quantityInLargeUnit + this.stock.numberInSmallUnit;

        stock.unitId = result.id;
        this.stocks.push(stock);

        this.stock.init(new StockDto());
        this.stock.numberInLargeUnit = 0;
        this.stock.numberInSmallUnit = 0;
        this.stock.count = 0;
        this.unit = " ";
      });
  }

  deleteStock(index) {
    const dStock = this.stocks[index];
    this.units = this.units.filter((z)=>{
      return !(z.stockId === dStock.id && z.unitId === dStock.unitId)
    });

    if (dStock.id === undefined) {
      this.stocks = this.stocks.filter((x) => {
        return !(
          x.sizeId === dStock.sizeId &&
          x.storeId === dStock.storeId &&
          x.numberInLargeUnit === dStock.numberInLargeUnit &&
          x.numberInSmallUnit === dStock.numberInSmallUnit &&
          x.count === dStock.count
        );
      });
    } else {
      this.deletedStocksIds.push(dStock.id);
      this.stocks = this.stocks.filter((x) => {
        return !(x.id === dStock.id);
      });
    }
  }
}
