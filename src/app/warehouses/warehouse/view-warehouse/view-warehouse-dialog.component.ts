import { Component, OnInit } from '@angular/core';
import { WarehouseDto, WarehouseServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-warehouse-dialog',
  templateUrl: './view-warehouse-dialog.component.html',

})
export class ViewWarehouseDialogComponent implements OnInit {
  id:number;
  data: WarehouseDto=new WarehouseDto();
  ngOnInit(): void {
    debugger
    this.initWarehouse()
  }

  constructor(public bsModalRef: BsModalRef,
    private _warehouseService:WarehouseServiceProxy,)
  {}

  initWarehouse()
  {
    this._warehouseService.get(this.id).subscribe((result)=>{
      debugger
      this.data=result;
    })
  }
}
