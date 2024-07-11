import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanProductDto, PlanServiceProxy, UnitServiceProxy, UpdatePlanDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-plan-dialog',
  templateUrl: './edit-plan-dialog.component.html',

})
export class EditPlanDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  loaded=false;
  minDate:Date;
  startDate: Date;

  plan = new UpdatePlanDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _planService: PlanServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.initPlan()

  }

  initPlan()
  {
    this._planService.getForEdit(this.id).subscribe((response)=>{
      this.plan=response;
      this.startDate = new Date(this.plan.startDate);
      this.loaded=true;

    });
  }
  addPlan(items: PlanProductDto[]) {
    this.plan.planProducts = [...items];
  }


  save(): void {


    this.plan.startDate = this.startDate.toLocaleString();

    if (this.plan.planProducts.length < 1) {
      this.notify.error(this.l('AddOneProductAtLeast'));
    }
    else{
   
      this.plan.planProducts.forEach((element) =>
      element.id = 0
    );
    this._planService.
    update(
      this.plan
    )
    .pipe(
      finalize(() => {
        this.saving = false;
      })
    )
    .subscribe((response: any) => {
      this.notify.info(this.l('EditSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    });
    }


  }

}
