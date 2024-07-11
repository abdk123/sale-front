import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateFormulaDto, FormulaDto,MaterialCodeForDropdownDto,MaterialServiceProxy, ProductInfoDropdownDto,UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { ViewMaterialDialogComponent } from '@app/settings/material/view-material/view-material-dialog.component';

@Component({
  selector: 'create-formula-dialog',
  templateUrl: './create-formula-dialog.component.html',
  styleUrls: ['./create-formula-dialog.component.scss']
})

export class CreateFormulaDialogComponent extends AppComponentBase {
  saving = false;
  materials: MaterialCodeForDropdownDto[] = [];
  materialsForDropDown: MaterialCodeForDropdownDto[] = [];
  units: UnitNameForDropdownDto[] = [];
  products: ProductInfoDropdownDto[] = [];
  productId: number;
  data: CreateFormulaDto[] = [];
  formula = new CreateFormulaDto();
  ColumnMode = ColumnMode;
  saveDisabled = true
  unitsNames: string[] = [];
  materialNames: string[] = [];
  isButtonDisabled = false;
  @Output() saveFormulaList = new EventEmitter<CreateFormulaDto[]>();
  defaultValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'min',
      localizationKey: 'QuantityCanNotBeNegativeOrZero',
    },
  ];
  @ViewChild('createformulaModal') createformulaModal;

  constructor(injector: Injector,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _modalService: BsModalService,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initMaterials();
  }

  QuantityValidationErrors(){
    let errors: AbpValidationError[] = [{name:'min',localizationKey:'QuantityCanNotBeNegativeOrZero',propertyKey:'QuantityCanNotBeNegativeOrZero'}];
    return errors;
  }

  initMaterials() {
    this._materialService.getCodeForDropdown().subscribe((response: MaterialCodeForDropdownDto[]) => {
      this.materialsForDropDown = response;
    });
  }

  initUnits(event) {
    debugger;
    this._unitService.getAllForMaterial(event.target.value).subscribe((response: UnitNameForDropdownDto[]) => {
      this.units = response;
    });
  }

  getUnitName(id: number) {
    this._unitService.getForEdit(id).subscribe((response) => {
      this.unitsNames.push(response.name);
    });
  }

  getMaterialName(id: number) {
    this._materialService.getForEdit(id).subscribe((result) => {
      this.materials.push(result);
    });
  }

  addToFormulaList() {
    this.isButtonDisabled = false;
    if (this.formula.materialId == null || this.formula.quantity == null || this.formula.unitId == null) {
      return;
    }
    else {
      this.getUnitName(this.formula.unitId);
      this.getMaterialName(this.formula.materialId)
      this.data.push(this.formula);
      this.data = [...this.data];
      this.saveFormulaList.emit(this.data);
      this.saving = true;
      this.formula = new FormulaDto()
      this.createformulaModal.reset()
    }
  }

  getUnitNameById(unitId) {
    return this.units.find(t => t.id == unitId).name;
  }

  edit(row: FormulaDto) {
    this.isButtonDisabled = true;
    this.formula = row
    const index = this.data.indexOf(row);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.unitsNames.splice(index, 1);
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
          id: row.materialId ,
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
