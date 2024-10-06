import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {  CustomerDto, CustomerServiceProxy, UpdateCustomerDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-material-dialog",
  templateUrl: "./edit-customer-dialog.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class EditCustomerDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  customer = new UpdateCustomerDto();
  types = [];
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.types = [
      {
        id: 0,
        name: this.l("Customer"),
      },
      {
        id: 1,
        name: this.l("Supplier"),
      },
      {
        id: 2,
        name: this.l("CustomerAndSupplier"),
      },
    ];

    this.initCustomer();
  }

  initCustomer() {
    this._customerService.get(this.id).subscribe((response: CustomerDto) => {
      this.customer = response;
    });
  }
  save(): void {
    this.saving = true;
    this._customerService
      .update(this.customer)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
