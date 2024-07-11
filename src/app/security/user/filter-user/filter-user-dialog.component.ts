import { Component, Injector, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';

@Component({
  selector: 'filter-user-dialog',
  templateUrl: './filter-user-dialog.component.html',
})
export class FilterUserDialogComponent extends FilterComponentBase implements OnInit {

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
        userName: { name: this.l('UserName'), type: 'string', operators: this.getOperators('string') },  
        emailAddress: { name: this.l('EmailAddress'), type: 'string', operators: this.getOperators('string') },  
      }
    }
  }

}
