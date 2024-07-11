import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {  SupplierDto, SupplierServiceProxy, UpdateSupplierDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-material-dialog',
  templateUrl: './edit-supplier-dialog.component.html',

})
export class EditSupplierDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  supplier =  new UpdateSupplierDto ();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _supplierService:SupplierServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this. initSupplier();
  }



  initSupplier(){
    this._supplierService.get(this.id).subscribe((response:SupplierDto) => {
     this.supplier = response;
   });
   }
   save(): void {
    this.saving = true;
    this._supplierService
      .update(
        this.supplier
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response:any) => {

          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
      });

  }

}
