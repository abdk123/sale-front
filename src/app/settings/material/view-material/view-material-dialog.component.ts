import { Component, OnInit } from '@angular/core';
import { MaterialDto, MaterialServiceProxy, SupplierDto, SupplierServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-material-dialog',
  templateUrl: './view-material-dialog.component.html',

})
export class ViewMaterialDialogComponent implements OnInit {
  data=new MaterialDto();
  supplier=new SupplierDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,
    private _materialService:MaterialServiceProxy){}
  ngOnInit(): void {
    this.initMaterial()
  }

  initMaterial()
  {
     this._materialService.get(this.id).subscribe((response)=>{
      this.data=response;
     })
  }


}
