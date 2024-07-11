import { Component, Injector, OnInit } from '@angular/core';
import { QueryBuilderConfig,Option } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { OutputRequestServiceProxy, PlanServiceProxy } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'filter-actually-dialog',
  templateUrl: './filter-actually-dialog.component.html',

})
export class FilterActuallyDialogComponent extends FilterComponentBase implements OnInit {
  outputRequests: Option[] = [];
  plans: Option[] = [];
  public config: QueryBuilderConfig;
  constructor(injcter: Injector,
    private _outputRequestService: OutputRequestServiceProxy,
    public _planService:PlanServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injcter);
  }
  ngOnInit(): void {
    
    this.initialQuery();
    this.initialOutputRequest();
    this.initialPlan();
    this.initialConfig();
  }
  initialPlan() {
    this._planService.getNameForDropdown()
    .subscribe(result=>{
      result.forEach(item=>{
        this.plans.push({name:item.title, value:item.id});
      });
    })
  }
  initialOutputRequest() {
    this._outputRequestService.getAll("",undefined,undefined,"","",0,1000) 
    .subscribe(result=>{
      console.log(result)
      result.items.forEach(item=>{
        this.outputRequests.push({name:item.title, value:item.id});
         console.log(this.outputRequests)
      });
    })
  }

  initialConfig() {
    this.classNames;
    this.config = {
      fields: {
        planId: {
          name: this.l('Plan'),
          type: 'category',
          options: this.plans,
          operators: this.getOperators('category')
        },
        outputRequestId: {
          name: this.l('OutputRequest'),
          type: 'category',
          options: this.outputRequests,
          operators: this.getOperators('category')
        }
      
 
      }
    }
  }


}
