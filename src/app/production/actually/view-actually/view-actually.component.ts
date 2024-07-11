import { Component, OnInit } from '@angular/core';
import { PlanDto, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActualDetailDialogComponent } from './actual-detail-dialog/actual-detail-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TestReportComponent } from '@app/reports/test-report/test-report.component';

@Component({
  selector: 'view-actually',
  templateUrl: './view-actually.component.html',

})
export class ViewActuallyComponent implements OnInit {
  canProduce:boolean=false;
  plan:PlanDto=new PlanDto();
  changeStatus=false;

  constructor( private _modalService: BsModalService,
    private _planService:PlanServiceProxy){}
  ngOnInit(): void {
  this.getLatestPlan()
}

getLatestPlan()
{
  this._planService.getLastPlanActual().subscribe((result) => {
    if(result.id > 0){
      this.plan = result;
    }
  })
}
actualyDetailDialog(planId){
  this._modalService.show(
    ActualDetailDialogComponent,
    {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        planId: planId,
      },
      class:'modal-xl'
    }
  );
}
TestReport(){
  this._modalService.show(
    TestReportComponent,
    {
      backdrop: true,
      ignoreBackdropClick: true,
   
      class:'modal-xl'
    }
  );
}

changePlanStatusToArchive(){
  this._planService.changeStatusToArchive(this.plan.id).subscribe((result)=>{
  })
}

showConfirmationModal(){
  this._modalService.show(
    ConfirmationDialogComponent,
    {
      backdrop: true,
      ignoreBackdropClick: true,
      class:'modal-md',
      initialState: {
        id: this.plan.id,
      },
    }
  );
}

}