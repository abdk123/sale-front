import { Component, Injector, OnInit } from '@angular/core';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';

@Component({
  selector: 'filter-warehouse-dialog',
  templateUrl: './filter-warehouse-dialog.component.html',

})
export class FilterWarehouseDialogComponent extends FilterComponentBase implements OnInit {
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
        Name: { name: this.l('Name'), type: 'string', operators: this.getOperators('string') },
        Place: { name: this.l('Place'), type: 'string', operators: this.getOperators('string') },
        WarehouseKeeper: { name: this.l('WarehouseKeeper'), type: 'string', operators: this.getOperators('string') },
        
      }
    }
  }


}
