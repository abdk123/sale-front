import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { QueryBuilderClassNames } from 'angular2-query-builder';
import { FilterDto, FilterRuleDto } from './service-proxies/service-proxies';

@Component({
  template: ''
})
export abstract class FilterComponentBase extends AppComponentBase implements OnInit {
  query: any;
  @Output() onSave = new EventEmitter<FilterDto>();
  filterInput: FilterDto;
  public classNames: QueryBuilderClassNames = {
    removeIcon: 'simple-icon-minus ',
    addIcon: 'simple-icon-plus text-success',
    arrowIcon: 'bi bi-chevron-right px-2',
    button: 'btn btn-default mb-1',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    emptyWarning: 'text-danger mx-auto',
    operatorControl: 'form-control rounded',
    operatorControlSize: 'col-auto pr-0',
    fieldControl: 'form-control rounded',
    fieldControlSize: 'col-auto pr-0',
    entityControl: 'form-control rounded',
    entityControlSize: 'col-auto pr-0',
    inputControl: 'form-control rounded',
    inputControlSize: 'col-auto'
  }

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.initialQuery();
  }

  protected abstract initialConfig(): void;

  getOperators(type: string){
    switch(type){
      case 'string': return ['=', '!=', this.l('Contains'), this.l('StartsWith'), this.l('EndsWith')];
      case 'number': return ['=','!=', '<=', '>'];
      case 'category': return ['=','!=', 'in', 'not in'];
      case 'date': return ['=','!=', '<=', '>'];
    }
  }

  initialQuery() {
    if(this.filterInput && this.filterInput.rules){
      this.query = {};
      this.query.rules = [];
      this.query.condition = this.filterInput.condition;
      this.filterInput.rules.forEach(item => {
        this.query.rules.push({ field: item.field, operator: item.operator, value: item.value });
      });
    }
  }
  filter() {
 
    const filterInput: FilterDto = new FilterDto();
    filterInput.rules = []
    filterInput.condition = this.query.condition;
    for(let i=0; i < this.query.rules.length;i++){
      const rule: FilterRuleDto = new FilterRuleDto();
      rule.init({
        field: this.query.rules[i].field,
        operator: this.query.rules[i].operator,
        value: this.query.rules[i].value
      });
      filterInput.rules.push(rule);
    }
    console.log(filterInput.rules)
    this.onSave.emit(filterInput);
  }

  
  
}