import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateCustomerDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
})
export class CreateCustomerDialogComponent  extends AppComponentBase {
  saving = false;
  customer =  new CreateCustomerDto();
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
   private _customerService:CustomerServiceProxy,
    public bsModalRef: BsModalRef,

  ) {
    super(injector);
  }
  ngOnInit(): void {

  }




   save(): void {
    this.saving = true;
    this._customerService.
    create(
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
