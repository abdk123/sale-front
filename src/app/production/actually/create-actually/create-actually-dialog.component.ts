import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateDailyProductionDetailsDto, CreateDailyProductionDto, DailyProductionDto, DailyProductionServiceProxy, OutputRequestDto, OutputRequestNameForDropdownDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanProductDto, PlanServiceProxy, ProductDto, ReadOutputRequesProductDto, UnitDto, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-actually-dialog',
  templateUrl: './create-actually-dialog.component.html',

})
export class CreateActuallyDialogComponent extends AppComponentBase {
  saving = false;
  planProductloaded = false;
  dailyProduction = new CreateDailyProductionDto();
  plans: PlanNameForDropdownDto[] = [];
  outputRequests: OutputRequestNameForDropdownDto[] = [];
  outputRequestsProducts: ReadOutputRequesProductDto[] = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _dailyProductionService: DailyProductionServiceProxy,
    private _planService: PlanServiceProxy,
    private _outputService: OutputRequestServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.dailyProduction.dailyProductionDetails = []
    this.initPlans();
  }
  initPlans() {
    this._planService.getActualPlansNameForDropdown().subscribe((result) => {
      this.plans = result;
    });
  }

  onSelectPlan(planId: number) {
    var plan = this.plans.find(x => x.id == planId);
    if (!plan) {
      this.outputRequests = [];
      return;
    }
    this.outputRequests = plan.outputRequests;
  }

  onSelectOutputRequest(id: number) {
    if (id != null) {
      this._outputService.getPlanOutputRequests(id).subscribe((result) => {
        result.forEach((item) => {
          this.dailyProduction.dailyProductionDetails = [];
          this.outputRequestsProducts = item.outputRequestProducts;
          //Initial dailyProductionDetails
          this.outputRequestsProducts.forEach(requestProduct => {
            var dailyProductionDetail = new CreateDailyProductionDetailsDto();
            dailyProductionDetail.productId = requestProduct.product.id;
            dailyProductionDetail.quantity = 0;
            this.dailyProduction.dailyProductionDetails.push(dailyProductionDetail);
          })
          this.planProductloaded = true;
        })

      });
    }
  }

  updatedQuantity(args, index) {
    this.dailyProduction.dailyProductionDetails[index].quantity = args.target.value;
  }

  save(): void {
    this.saving = true;
    this._dailyProductionService.
      create(
        this.dailyProduction
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
