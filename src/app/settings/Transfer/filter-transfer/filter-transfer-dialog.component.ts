import { Component, Injector, OnInit } from '@angular/core';
import { UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { Option, QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';

@Component({
  selector: 'filter-transfer-dialog',
  templateUrl: './filter-transfer-dialog.component.html',

})
export class FilterTransferDialogComponent extends FilterComponentBase implements OnInit {
  public config: QueryBuilderConfig
  units: Option[] = [];
  constructor(injcter: Injector,
    private _UnitService: UnitServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injcter);
  }
  ngOnInit(): void {
    this.initialQuery();
    this.initialUnit();
    this.initialConfig();
  }
  initialUnit() {
    this._UnitService.getNameForDropdown()
    .subscribe(result=>{
      result.forEach(item=>{
        this.units.push({name:item.name, value:item.id});
      });
    })
  }
  initialConfig() {
    this.classNames;
    this.config = {
      fields: {
        value: { name: this.l('Value'), type: 'number', operators: this.getOperators('number') },
        toId: {
          name: this.l('To'),
          type: 'category',
          options: this.units,
          operators: this.getOperators('category')
        },
        fromId: {
          name: this.l('From'),
          type: 'category',
          options: this.units,
          operators: this.getOperators('category')
        }
      }
    }
  }


}
