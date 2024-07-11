import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransferDto, TransferServiceProxy, SupplierDto, SupplierServiceProxy, UpdateTransferDto, UnitServiceProxy, UnitNameForDropdownDto, UnitDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
@Component({
  selector: 'view-transfer-dialog',
  templateUrl: './view-transfer-dialog.component.html',

})
export class ViewTransferDialogComponent  {
  saving = false;
  editable:true;
  id:number;
  fromUnit: UnitDto=new UnitDto();
  ToUnit: UnitDto=new UnitDto();

  transfer =  new UpdateTransferDto ();

  constructor(
    private _transferService:TransferServiceProxy,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,

  ) {

  }
  ngOnInit(): void {


    this. initTransfer();

  }
  initfromUnits() {
    this._unitService.get(this.transfer.fromId).subscribe((result) => {
      this.fromUnit = result;
    });
  }
  initToUnits() {
    this._unitService.get(this.transfer.toId).subscribe((result) => {
      this.ToUnit = result;
    });
  }


  initTransfer(){
     (this.id)
    this._transferService.get(this.id).subscribe((result) => {
     this.transfer = result;
     this.initfromUnits();
    this.initToUnits();

   });
   }

}
