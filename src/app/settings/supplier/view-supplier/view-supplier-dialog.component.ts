import { Component, OnInit } from '@angular/core';
import { SupplierDto, SupplierServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-supplier-dialog',
  templateUrl: './view-supplier-dialog.component.html',

})
export class ViewSupplierDialogComponent implements OnInit {
  data = new SupplierDto();
  id: number;
  editable: true;
  constructor(public bsModalRef: BsModalRef,
    private _supplierService:SupplierServiceProxy, ){}
  ngOnInit(): void {
    this.initSupplier()
  }

  initSupplier(){
    this._supplierService.get(this.id).subscribe((response:SupplierDto) => {
     this.data = response;
   });
   }

}
