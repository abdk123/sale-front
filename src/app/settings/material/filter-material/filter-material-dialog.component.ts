import { Component, Injector, OnInit } from '@angular/core';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { SupplierServiceProxy } from '@shared/service-proxies/service-proxies';
import { QueryBuilderConfig,Option } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'filter-material-dialog',
  templateUrl: './filter-material-dialog.component.html',

})
export class FilterMaterialDialogComponent extends FilterComponentBase implements OnInit {
  public config: QueryBuilderConfig;
  suppliers: Option[] = [];
  constructor(injcter: Injector,
    private _supplierService:SupplierServiceProxy,
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
        code: { name: this.l('Code'), type: 'string', operators: this.getOperators('string') },  
  
    
      }
    }
  }


}