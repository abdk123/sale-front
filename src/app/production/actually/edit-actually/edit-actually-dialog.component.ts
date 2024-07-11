import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DailyProductionDetailsDto, DailyProductionDto, DailyProductionServiceProxy, OutputRequestNameForDropdownDto, OutputRequestServiceProxy, PlanNameForDropdownDto, PlanServiceProxy, ReadOutputRequesProductDto, UpdateDailyProductionDetailsDto, UpdateDailyProductionDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-actually-dialog',
  templateUrl: './edit-actually-dialog.component.html',

})
export class EditActuallyDialogComponent extends AppComponentBase {
  id: number;
  saving = false;
  isLoading = false;
  planProductloaded = false;
  dailyProduction = new UpdateDailyProductionDto();
  plans: PlanNameForDropdownDto[] = [];
  outputRequests: OutputRequestNameForDropdownDto[] = [];
  dailyProductionDetails: DailyProductionDetailsDto[] = [];
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
    this.initPlans();
    this.initDailyProduction(this.id);
  }

  initPlans() {
    this.dailyProduction.dailyProductionDetails = [];
    this._planService.getActualPlansNameForDropdown().subscribe((result) => {
      this.plans = result;
    });
  }
  getPlanOutputRequests(id:number){
    this._outputService.getPlanOutputRequests(id).subscribe((result) => {
      result.forEach((item) => {
        this.dailyProduction.dailyProductionDetails = [];
        this.outputRequestsProducts = item.outputRequestProducts;
        //Initial dailyProductionDetails
        this.planProductloaded = true;
      })
      this.dailyProductionDetails.forEach(requestProduct => {
        var dailyProductionDetail = new UpdateDailyProductionDetailsDto();
        dailyProductionDetail.productId = requestProduct.product.id;
        dailyProductionDetail.quantity = requestProduct.quantity;
        this.dailyProduction.dailyProductionDetails.push(dailyProductionDetail);
        this.isLoading = true;
      })
    });
  }

  initDailyProduction(id: number) {    
    this._dailyProductionService.get(id).subscribe((result) => {
      this.dailyProduction.id = result.id;
      this.dailyProduction.note = result.dailyProductionNotes[0].note;
      this.dailyProduction.planId = result.planId;
      this.dailyProduction.outputRequestId = result.outputRequestId;
      this.dailyProductionDetails =result.dailyProductionDetails;
      var plan = this.plans.find(x => x.id == this.dailyProduction.planId);
      if (!plan) {
        this.outputRequests = [];
        return;
      }
      this.outputRequests = plan.outputRequests;
      this.getPlanOutputRequests(result.planId);
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
            var dailyProductionDetail = new UpdateDailyProductionDetailsDto();
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
      update(
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
