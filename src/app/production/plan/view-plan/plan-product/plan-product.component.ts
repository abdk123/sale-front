import { Component, Injector, Input, OnInit } from '@angular/core';
import { ChartService } from '@app/@components/charts/chart.service';
import { Colors } from '@app/@components/charts/color.service';
import { MaterialDetailsComponent } from '@app/settings/material/material-details/material-details.component';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanDto, PlanProductDto, PlanServiceProxy, UpdatePlanDto, UpdatePlanProductDto } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-plan-product',
  templateUrl: './plan-product.component.html',
  styleUrls: ['./plan-product.component.scss']

})
export class PlanProductComponent extends AppComponentBase implements OnInit {

  @Input() planProducts: PlanProductDto[];
  @Input() sendplan: PlanDto=new PlanDto();
  updatePlanProducts: UpdatePlanProductDto[]=[];
  chartDataConfig: ChartService;
  cancel:boolean=false;
  IsUpdate:boolean=false;
  change:boolean=false;
  numberOfItem:number;
  plan = new UpdatePlanDto();
  index:number;
  constructor(private chartService: ChartService
    ,private _planService:PlanServiceProxy,
    private _modalService: BsModalService,
    injector: Injector,
  ) {
    super(injector);
    this.chartDataConfig = this.chartService;
  }
  ngOnInit(): void {
    this.initPlan();

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

  initPlan()
  {
    this._planService.getForEdit(this.planProducts[0].planId).subscribe((response)=>{
      this.plan=response;
      console.log(this.planProducts)
    });
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
  editNumberofItem(index:number)
  {

    this.index=index;
    this.cancel=true;
    this.IsUpdate=true;
    this.change=false;

  }
  CancelEdit()
  {
      this.cancel=false;
      this.IsUpdate=false;
      this.change=true;

  }
  updatePlan(numberOfItems:number,productId:number)
  {

    this.IsUpdate=false;
    this.cancel=false;
    this.IsUpdate=false;
    this.change=true;
    let planProducts= this.plan.planProducts

    planProducts.forEach((item)=>{

      if(item.productId==productId)
      {
        item.numberOfItems=numberOfItems

      }
      this.updatePlanProducts.push(new UpdatePlanProductDto({
        id:0,
        numberOfItems:item.numberOfItems,
        priority:item.priority,
        productId:item.productId,
        planId:item.planId,
      }))

       this.plan.planProducts=this.updatePlanProducts;
    })

      this._planService.update(this.plan).subscribe((result)=>{
        this.notify.info(this.l('SavedSuccessfully'));
        location.reload()
      });
  }
  deleteProduct(productId:number)
  {

    let planProduct=this.plan.planProducts.filter(x=>x.productId!=productId);
    if (planProduct.length < 1) {
      this.notify.error(this.l('There must be at least one product'));
    }
    else{

    planProduct.forEach((item)=>{
      this.updatePlanProducts.push(new UpdatePlanProductDto({
        id:0,
        numberOfItems:item.numberOfItems,
        priority:item.priority,
        productId:item.productId,
        planId:item.planId,
      }))
       this.plan.planProducts=this.updatePlanProducts;

    });


      this._planService.update(this.plan).subscribe((result)=>{

        this.notify.info(this.l('DeleteSuccessfully'));
        location.reload()
      });
    }


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
          label: 'Requied quantity',
          borderColor: Colors.getColors().themeColor1,
          backgroundColor: Colors.getColors().themeColor1_10,
          data: data,
          borderWidth: 2
        }
      ]
    };
  }

}
