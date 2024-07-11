import { filter } from 'rxjs/operators';
import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ProductComponent } from '@app/settings/product/product.component';
import { QueryBuilderClassNames, QueryBuilderConfig } from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends AppComponentBase implements OnInit {
  @ViewChild(ProductComponent) ProductComponent!: ProductComponent;
  query:  any;
  componentName: string;
  constructor(injcter: Injector, public bsModalRef: BsModalRef,
    private _productService: ProductServiceProxy) {
    super(injcter);
  }

  classNames: QueryBuilderClassNames = {
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

  config: QueryBuilderConfig;
  ngOnInit(): void {
    this.query.rules = [

    ];
    this.getConfig();


  }

  getConfig() {
    if (this.componentName == 'ProductComponent') {
      this.config = {
        fields: {
          name: { name: 'Name', type: 'string' },
          size: { name: 'Size', type: 'number' },
          price: { name: 'Price', type: 'number' },

        }
      }

    }

    else if (this.componentName == 'MaterialComponent') {
      this.config = {
        fields: {
          name: { name: 'Name', type: 'string' },
          size: { name: 'Code', type: 'string' },
          price: { name: 'Suppliers', type: 'string' },

        }
      }

    }


    else if (this.componentName == 'SupplierComponent' || this.componentName == 'UnitComponent') {
      this.config = {
        fields: {
          name: { name: 'Name', type: 'string' },

        }
      }

    }

    else if (this.componentName == 'TransferComponent') {
      this.config = {
        fields: {
          from: { name: 'From', type: 'string' },
          to: { name: 'To', type: 'string' },
          value: { name: 'Value', type: 'number' },

        }
      }

    }

    else if (this.componentName == 'TransferComponent') {
      this.config = {
        fields: {
          from: { name: 'From', type: 'string' },
          to: { name: 'To', type: 'string' },
          value: { name: 'Value', type: 'number' },

        }
      }

    }

    else if (this.componentName == 'WarehouseComponent') {
      this.config = {
        fields: {
          warehouse: { name: 'Warehouse', type: 'string' },
          storekeeper: { name: 'Storekeeper', type: 'string' },
          place: { name: 'place', type: 'string' },

        }
      }

    }
    else if (this.componentName == 'WarehouseMaterialComponent') {
      this.config = {
        fields: {
          material: { name: 'Material', type: 'string' },
          warehouse: { name: 'Warehouse', type: 'string' },
          quantity: { name: 'Quantity', type: 'number' },
          ExpirationDate: { name: 'ExpirationDate', type: 'date' },

        }
      }

    }
    else if (this.componentName == 'OutputRequestComponent') {
      this.config = {
        fields: {
          name: { name: 'Name', type: 'string' },
          plan: { name: 'Plan', type: 'string' },
          product: { name: 'Product', type: 'string' },
          outputDate: { name: 'OutputDate', type: 'date' },

        }
      }

    }
    else if (this.componentName == 'PlanComponent') {
      this.config = {
        fields: {
          title: { name: 'Title', type: 'string' },
          duration: { name: 'Duration', type: 'number' },
          StartDate: { name: 'StartDate', type: 'date' },


        }
      }

    }

    else if (this.componentName == 'ActuallyComponent') {
      this.config = {
        fields: {
          plan: { name: 'Plan', type: 'string' },
          OutputRequest: { name: 'OutputRequest', type: 'string' },



        }
      }

    }


    else if (this.componentName == 'UserComponent') {
      this.config = {
        fields: {
          fullname: { name: 'FullName', type: 'string' },
          username: { name: 'UserName', type: 'string' },
          emailaddress: { name: 'EmailAddress', type: 'string' },
        }
      }
    }

    else if (this.componentName == 'RoleComponent') {
      this.config = {
        fields: {
          name: { name: 'Name', type: 'string' },
          displayName: { name: 'DisplayName', type: 'string' },

        }
      }
    }
  }

  filter() {
    // this.query.condition = "and";
    // this.query.rules.forEach((element) => {
    //   element.field = "Price",
    //   element.operator = ">",
    //   element.value = '11'
    // });
    // this._productService.filter(this.query).subscribe((reponse) => {

    // });
  }
}
