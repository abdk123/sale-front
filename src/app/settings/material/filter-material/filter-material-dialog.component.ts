import { Component, Injector, OnInit } from '@angular/core';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { QueryBuilderConfig,Option } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'filter-material-dialog',
  templateUrl: './filter-material-dialog.component.html',
})
export class FilterMaterialDialogComponent extends FilterComponentBase implements OnInit {
  public config: QueryBuilderConfig;
  customers: Option[] = [];
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
        specification: { name: this.l('Specification'), type: 'string', operators: this.getOperators('string') },  
      }
    }
  }


}