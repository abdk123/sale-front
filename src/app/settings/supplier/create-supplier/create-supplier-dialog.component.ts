import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateSupplierDto, SupplierServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-supplier-dialog',
  templateUrl: './create-supplier-dialog.component.html',
})
export class CreateSupplierDialogComponent  extends AppComponentBase {
  saving = false;
  supplier =  new CreateSupplierDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
   private _supplierService:SupplierServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {

  }




   save(): void {
    this.saving = true;
    this._supplierService.
    create(
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
