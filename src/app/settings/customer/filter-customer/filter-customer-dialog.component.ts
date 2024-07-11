import { Component, Injector, OnInit } from '@angular/core';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'filter-customer-dialog',
  templateUrl: './filter-customer-dialog.component.html',
 
})
export class FilterCustomerDialogComponent  extends FilterComponentBase implements OnInit {
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
        name: { name: this.l('Name'), type: 'string', operators: this.getOperators('string') },  
      }
    }
  }


}