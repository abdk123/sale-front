import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewMaterialDialogComponent } from '@app/settings/material/view-material/view-material-dialog.component';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import {
  FormulaDto, MaterialCodeForDropdownDto, MaterialServiceProxy,
  ProductDto, ProductInfoDropdownDto, ProductServiceProxy, UnitNameForDropdownDto,
  UnitServiceProxy, UpdateFormulaDto, UpdateProductDto
} from '@shared/service-proxies/service-proxies';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'edit-formula-dialog',
  templateUrl: './edit-formula-dialog.component.html',
  styleUrls: ['./edit-formula-dialog.component.scss']
})

export class EditFormulaDialogComponent extends AppComponentBase {
  saving = false;
  loaded = false;
  ColumnMode = ColumnMode;
  materials: MaterialCodeForDropdownDto[] = [];
  materialDropdown: MaterialCodeForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  unitDropdown: UnitNameForDropdownDto[] = [];
  products: ProductInfoDropdownDto[] = [];
  data: UpdateFormulaDto[] = [];
  formula = new UpdateFormulaDto();
  product: UpdateProductDto = new UpdateProductDto();
  @Input() productId: number;
  @Output() saveFormulaList = new EventEmitter<UpdateFormulaDto[]>();
  isButtonDisabled = false;
  @ViewChild('editformulaModal') editformulaModal;

  constructor(injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _productService: ProductServiceProxy,
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.productId = params['id'];
    });

    this.initProduct();
    this.initMaterials();
  }

  initProduct() {
    this._productService.get(this.productId).subscribe((result: ProductDto) => {
      this.product = result;
      this.product.formulas.forEach(element => {
        this.data.push(element);
        this.getMaterialsName(element.materialId);
        this.getUnitName(element.unitId);
        this.data = [...this.data];
      });
    });
  }

  initMaterials() {
    this._materialService.getCodeForDropdown().subscribe((result) => {
      this.materialDropdown = result;
    });
  }

  initUnits(materialId) {
    this._unitService.getAllForMaterial(materialId).subscribe((result) => {
      this.unitDropdown = result;
    });
  }

  getMaterialsName(id) {
    this._materialService.get(id).subscribe((result) => {
      this.materials.push(result);
    });
  }

  getUnitName(id) {
    this._unitService.get(id).subscribe((result) => {
      this.units.push(result);
    });
  }

  addToFormulaList() {
    this.isButtonDisabled = false;
    if (this.formula.materialId == null || this.formula.quantity == null || this.formula.unitId == null) {
      return;
    }
    else {
      this.data.push(this.formula);
      this.data = [...this.data];
      this.getMaterialsName(this.formula.materialId);
      this.getUnitName(this.formula.unitId);
      this.saveFormulaList.emit(this.data);
      this.formula = new FormulaDto();
      this.editformulaModal.reset()
    }
  }

  edit(row: FormulaDto) {
    this.isButtonDisabled = true;
    this.formula = row;
    this.initUnits(this.formula.materialId);
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.units.splice(index, 1);
      this.materials.splice(index, 1);
    }
  }

  view(row: FormulaDto) {
    this._modalService.show(
      ViewMaterialDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: row.materialId,
        },
        class: 'modal-lg',
      }
    );
  }

  delete(row: FormulaDto) {
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.saveFormulaList.emit(this.data);
    }
  }
  quantityValidationErrors() {
    let errors: AbpValidationError[] = [{ name: 'min', localizationKey: 'QuantityCanNotBeNegativeOrZero', propertyKey: 'QuantityCanNotBeNegativeOrZero' }];
    return errors;
  }
  percentageValidationErrors() {
    let errors: AbpValidationError[] = [
      { name: 'min', localizationKey: 'PercentageCanNotBeNegativeOrZero', propertyKey: 'PercentageQuantityCanNotBeNegativeOrZero' },
      { name: 'max', localizationKey: 'PercentageCanNotBeGreaterThan100', propertyKey: 'PercentageCanNotBeGreaterThan100' }
    ];
    return errors;
  }
}
