import { Component, Injector, OnInit } from '@angular/core';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'filter-workflow-dialog',
  templateUrl: './filter-workflow-dialog.component.html',

})
export class FilterWorkflowDialogComponent  extends FilterComponentBase implements OnInit {
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
        title: { name: this.l('Title'), type: 'string', operators: this.getOperators('string') },

      }
    }
  }


}
