import { Component, Injector, Input, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { PlanDto, PlanMaterialDto, PlanProductDto, PlanServiceProxy, ProductDto } from '@shared/service-proxies/service-proxies';
import { forEach } from 'lodash';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ArbitrageDialogComponent } from './arbitrage-dialog/arbitrage-dialog.component';
import { MaterialDetailsComponent } from '@app/settings/material/material-details/material-details.component';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-actual-product',
  templateUrl: './actual-product.component.html',

})
export class ActualProductComponent  extends AppComponentBase implements OnInit{

  @Input() planProducts: PlanProductDto[];
  chartDataConfig: ChartService;
  productionPercent: number;
  tooltipData = {
    requiredQuantity: this.l('TheNumberRequiredToBeProduced'),
    canProduce: this.l('TheNumberThatCanBeProducedAccordingToTheQuantitiesOfMaterialsPresentInTheWarehouses'),
    totalProduction: this.l('NumberProducedSoFar'),
    cost:this.l('TheCostOfProducingOnePackage/TheCostOfProducingTheNumberThatCanBeProduced') ,
    price: this.l('TotalSalesAmountAccordingToTheNumberOfPackagesProduced/ProductPrice'),
    productArbitrage:this.l('ProductBalancing')
  }
  constructor(private chartService: ChartService
    ,private _planService:PlanServiceProxy,
    private _modalService: BsModalService,
    injector: Injector, ) {
      super(injector);
    this.chartDataConfig = this.chartService;
  }
  ngOnInit(): void {

  }
  editMaterial(id:number) {
    this._modalService.show(
      MaterialDetailsComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          id: id,
        },
        class:'modal-lg'
      }
    );
  }
  getTotalQuentity(planProduct: PlanProductDto, materialId){
    return planProduct.planProductMaterials.find(x=>x.materialId == materialId).requiredQuantity;
  }
  getNumberOfItem(planProduct: PlanProductDto, materialId){
    return planProduct.planProductMaterials.find(x=>x.materialId == materialId).canProduce;
  }
  checkBalanceIsSufficient(planProduct: PlanProductDto, materialId): boolean{
    var planProductMaterial = planProduct.planProductMaterials.find(x=>x.materialId == materialId);
    if(!planProductMaterial)
      return true;

    return planProductMaterial.canProduce == planProduct.numberOfItems;
  }
  getChartData(planProduct: PlanProductDto){
    let materials = [];
    let data = [];
    planProduct.product.formulas.forEach(formula => {
      materials.push(formula.material.name);
    });
    planProduct.planProductMaterials.forEach(planProductMaterial => {
      data.push(planProductMaterial.requiredQuantity);
    });


    return {
      labels: materials,
      datasets: [
        {
          label:this.l('RequiedQuantity') ,
          borderColor: Colors.getColors().themeColor1,
          backgroundColor: Colors.getColors().themeColor1_10,
          data: data,
          borderWidth: 2
        }
      ]
    };
  }

  arbitrageDialog(planProduct: PlanProductDto){
    this._modalService.show(
      ArbitrageDialogComponent,
      {
        backdrop: true,
        ignoreBackdropClick: true,
        initialState: {
          planProduct: planProduct
        },
        class:'modal-md'
      }
    );
  }
}

