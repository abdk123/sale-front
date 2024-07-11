import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {  CustomerDto, CustomerServiceProxy, UpdateCustomerDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-material-dialog',
  templateUrl: './edit-customer-dialog.component.html',

})
export class EditCustomerDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  customer =  new UpdateCustomerDto ();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _customerService:CustomerServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {
    this. initCustomer();
  }



  initCustomer(){
    this._customerService.get(this.id).subscribe((response:CustomerDto) => {
     this.customer = response;
   });
   }
   save(): void {
    this.saving = true;
    this._customerService
      .update(
        this.customer
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
