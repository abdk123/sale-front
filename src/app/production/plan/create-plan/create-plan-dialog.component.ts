import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreatePlanDto, PlanDto, PlanProductDto, PlanServiceProxy, ProductDto, UnitDto, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-plan-dialog',
  templateUrl: './create-plan-dialog.component.html',

})
export class CreatePlanDialogComponent extends AppComponentBase {
  saving = false;
  minDate: Date
  plan = new CreatePlanDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _planService: PlanServiceProxy,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  addPlan(items: PlanProductDto[]) {
    this.plan.planProducts = [...items];
  }

  save(): void {

      if (!this.plan.planProducts || this.plan.planProducts.length <= 0) {
        this.notify.error(this.l('AddOneProductAtLeast'));
      } 
      else {
        this.plan.startDate.toString();
        this._planService.
          create(
            this.plan
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
  }



