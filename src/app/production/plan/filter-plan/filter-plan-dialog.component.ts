import { Component, Injector, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';

@Component({
  selector: 'filter-plan-dialog',
  templateUrl: './filter-plan-dialog.component.html',
})
export class FilterPlanDialogComponent extends FilterComponentBase implements OnInit {

  public config: QueryBuilderConfig;
  constructor(injcter: Injector,
    public bsModalRef: BsModalRef) {
    super(injcter);
  }
  ngOnInit(): void {
    this.initialQuery();
    this.initialConfig();
  }
  initialConfig() {
    this.classNames;
    this.config = {
      fields: {
        title: { name: this.l('Title'), type: 'string', operators: this.getOperators('string') },
        duration: { name: this.l('Duration'), type: 'number', operators: this.getOperators('number') },
        startDate: { name: this.l('StartDate'), type: 'date', operators: this.getOperators('date') },
        status: { name: this.l('Status'), type: 'refrence', operators: this.getOperators('refrence') },
 
      }
    }
  }


}
