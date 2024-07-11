import { Component, Injector, OnInit } from '@angular/core';
import { FilterDto, FilterRuleDto, NationalityServiceProxy } from '@shared/service-proxies/service-proxies';
import { Option, QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';

@Component({
  selector: 'filter-employee-dialog',
  templateUrl: './filter-employee-dialog.component.html',

})
export class FilterEmployeeDialogComponent extends FilterComponentBase implements OnInit {
  
  nationalities: Option[] = [];
  public config: QueryBuilderConfig;
  constructor(injcter: Injector,
    private _nationalityService: NationalityServiceProxy,
    public bsModalRef: BsModalRef) {
    super(injcter);
  }
  ngOnInit(): void {
    this.initialQuery();
    this.initialNationality();
    this.initialConfig();
  }

  
  initialNationality() {
    this._nationalityService.getAll()
    .subscribe(result=>{
      result.forEach(item=>{
        this.nationalities.push({name:item.name, value:item.id});
      });
    })
  }

  initialConfig() {
    this.classNames;
    this.config = {
      fields: {
        FirstName: { name: this.l('FirstName'), type: 'string', operators: this.getOperators('string') },
        LastName: { name: this.l('LastName'), type: 'string', operators: this.getOperators('string') },
        NationalityId: {
          name: this.l('Nationality'),
          type: 'category',
          options: this.nationalities,
          operators: this.getOperators('category')
        }
      }
    }
  }


}
