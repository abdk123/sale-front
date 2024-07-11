import { Component, Injector, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';

@Component({
  selector: 'filter-unit-dialog',
  templateUrl: './filter-unit-dialog.component.html',

})
export class FilterUnitDialogComponent extends FilterComponentBase implements OnInit {
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
