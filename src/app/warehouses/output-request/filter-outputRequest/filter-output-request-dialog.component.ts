import { Component, Injector, OnInit } from '@angular/core';
import { QueryBuilderConfig ,Option} from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { PlanServiceProxy } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'filter-output-request-dialog',
  templateUrl: './filter-output-request-dialog.component.html',
})
export class FilterOutputRequestDialogComponent extends FilterComponentBase implements OnInit {
  public config: QueryBuilderConfig;
  plans: Option[] = [];
  constructor(injcter: Injector,
    public bsModalRef: BsModalRef,
    public _planService:PlanServiceProxy) {
    super(injcter);
  }
  ngOnInit(): void {
    this.initialQuery();
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
  initialConfig() {
    this.classNames;
    this.config = {
      fields: {
        name: { name: this.l('Title'), type: 'string', operators: this.getOperators('string') },
        planId: {
          name: this.l('Plan'),
          type: 'category',
          options: this.plans,
          operators: this.getOperators('category')
        },
        status: { name: this.l('Status'), type: 'string', operators: this.getOperators('string') },
        // { label: this.l('Status'), name: 'status',  type: 'enum' , enumValue: this.status ,sortable: true },
        outputDate: { name: this.l('OutputDate'), type: 'date', operators: this.getOperators('date') },
        
      }
    }
  }


}
