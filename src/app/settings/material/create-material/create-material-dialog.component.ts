import { Component, EventEmitter, Injector, Output } from "@angular/core";
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
  stock: CreateStockDto = new CreateStockDto();
  stocks: CreateStockDto[] = [];
  stores: StoreForDropdownDto[] = [];
  sizes: SizeForDropdownDto[] = [];
  unit: string = "";
  units: string[] = [];
  expiryDate: Date;
  @Output() onSave = new EventEmitter<any>();

  // fields = [
  //   { label: this.l("Store"), name: "storeId", sortable: true, type: "number" },
  //   { label: this.l("Unit"), name: "unitId", sortable: true, type: "number" },
  //   {
  //     label: this.l("NumberInLargeUnit"),
  //     name: "numberInLargeUnit",
  //     sortable: true,
  //     type: "number",
  //   },
  //   { label: this.l("Count"), name: "count", sortable: true, type: "number" },
  //   {
  //     label: this.l("QuantityInLargeUnit"),
  //     name: "quantityInLargeUnit",
  //     sortable: true,
  //     type: "number",
  //   },
  //   {
  //     label: this.l("TotalNumberInSmallUnit"),
  //     name: "totalNumberInSmallUnit",
  //     sortable: true,
  //     type: "number",
  //   },
  //   {
  //     label: this.l("NumberInSmallUnit"),
  //     name: "numberInSmallUnit",
  //     sortable: true,
  //     type: "number",
  //   },
  // ];

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
    this.initialCategories();
    this.initialStores();
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

  getStoreName(storeId) {
    return this.stores.find((x) => x.id == storeId).name;
  }

  getSizeName(sizeId) {
    return this.sizes.find((x) => x.id == sizeId).name;
  }

  getUnitName(index) {
    return this.units[index];
  }

  save(): void {
    this.saving = true;
    this._materialService
      .create(this.material)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        })
      )
      .subscribe((result) => {
        this.stocks.forEach((item) => {
          item.materialId = result.id;
          this._stockService.create(item).subscribe((res) => {});
        });
      });
  }

  AddStock() {
    this._unitService
      .create(
        new CreateUnitDto({
          id: undefined,
          name: this.unit,
        })
      )
      .subscribe((result) => {
        this.units.push(this.unit);

        const stock = new CreateStockDto(this.stock);
        stock.quantityInLargeUnit = Math.round(
          this.stock.numberInLargeUnit * this.stock.count
        );
        stock.totalNumberInSmallUnit =
          stock.quantityInLargeUnit + this.stock.numberInSmallUnit;

        stock.unitId = result.id;
        this.stocks.push(stock);

        this.stock.init(new CreateStockDto());
        this.stock.numberInLargeUnit = 0;
        this.stock.numberInSmallUnit = 0;
        this.stock.count = 0;
        this.unit = " ";
      });
  }

  deleteStock(index) {
    const dStock = this.stocks[index];
    this.stocks = this.stocks.filter((x) => {
      return !(
        x.sizeId === dStock.sizeId &&
        x.storeId === dStock.storeId &&
        x.numberInLargeUnit === dStock.numberInLargeUnit &&
        x.numberInSmallUnit === dStock.numberInSmallUnit &&
        x.count === dStock.count
      );
    });
  }
}
