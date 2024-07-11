import { Component, Injector, OnInit } from '@angular/core';
import {QueryBuilderConfig ,Option} from 'angular2-query-builder';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterComponentBase } from '@shared/filter-Component-base';
import { MaterialServiceProxy, WarehouseServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'filter-warehouse-material-dialog',
  templateUrl: './filter-warehouse-material-dialog.component.html',

})
export class FilterWarehouseMaterialDialogComponent extends FilterComponentBase implements OnInit {
  public config: QueryBuilderConfig;
  materials: Option[] = [];
  warehouses: Option[] = [];
  constructor(injcter: Injector,
    public bsModalRef: BsModalRef,
    public _materialService:MaterialServiceProxy,
    public _WarehouseService:WarehouseServiceProxy  ) {
    super(injcter);
  }
  ngOnInit(): void {
    this.initialQuery();
    this.initialMaterial();
    this.initialWarehouse();
    this.initialConfig();
  }

  initialMaterial() {
    this._materialService.getNameForDropdown()
    .subscribe(result=>{
      result.forEach(item=>{
        this.materials.push({name:item.name, value:item.id});
      });
    })
  }
  initialWarehouse() {
    this._WarehouseService.getNameForDropdown()
    .subscribe(result=>{
      result.forEach(item=>{
        this.warehouses.push({name:item.name, value:item.id});
      });
    })
  }
  initialConfig() {
    this.classNames;
    this.config = {
      fields: {
        expirationDate: { name: this.l('ExpirationDate'), type: 'date', operators: this.getOperators('date') },
        initialQuantity: { name: this.l('InitialQuantity'), type: 'number', operators: this.getOperators('number') },
        currentQuantity: { name: this.l('CurrentQuantity'), type: 'number', operators: this.getOperators('number') },
        materialId: {
          name: this.l('Material'),
          type: 'category',
          options: this.materials,
          operators: this.getOperators('category')
        },
        warehouseId: {
          name: this.l('warehouse'),
          type: 'category',
          options: this.warehouses,
          operators: this.getOperators('category')
        },
    
      }
    }

   
  }


}
