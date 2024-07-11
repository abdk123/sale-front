import { FormulaDto, FormulaServiceProxy, MaterialDto, MaterialServiceProxy, ProductDto, ProductServiceProxy, UnitDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-formula-dialog',
  templateUrl: './view-formula-dialog.component.html',

})
export class ViewFormulaDialogComponent implements OnInit {
  materials: MaterialDto[] = [];
  units: UnitDto[] = [];
  data: FormulaDto[] = [];


  @Input() productId: number;
  constructor(public bsModalRef: BsModalRef,
    private _materialService: MaterialServiceProxy,
    private _unitService: UnitServiceProxy,
    private _productService: ProductServiceProxy) { }
  ngOnInit(): void {

    this.initProduct()
  }

  initProduct() {
    this._productService.get(this.productId).subscribe((response: ProductDto) => {

      this.data = response.formulas;
      response.formulas.forEach(element => {
        this.initMaterials(element.materialId);
        this.initUnits(element.unitId);

      });

    })

  }

  initMaterials(id: number) {
    this._materialService.get(id).subscribe((response: MaterialDto) => {
      this.materials.push(response);

    });
  }
  initUnits(id: number) {
    this._unitService.get(id).subscribe((response: UnitDto) => {
      this.units.push(response);

    });
  }



}
