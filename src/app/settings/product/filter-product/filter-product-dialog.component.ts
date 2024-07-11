import { Component, Injector, OnInit } from '@angular/core';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { FormulaServiceProxy } from '@shared/service-proxies/service-proxies';
import { QueryBuilderConfig,Option } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'filter-product-dialog',
  templateUrl: './filter-product-dialog.component.html',
 
})
export class FilterProductDialogComponent  extends FilterComponentBase implements OnInit {
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
        size: { name: this.l('Size'), type: 'number', operators: this.getOperators('number') },  
        price: { name: this.l('Price'), type: 'number', operators: this.getOperators('number') },  
        
      }
    }
  }


}