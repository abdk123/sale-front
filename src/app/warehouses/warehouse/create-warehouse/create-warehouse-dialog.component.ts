import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {UserForDropdownDto, CreateWarehouseDto, WarehouseServiceProxy, UserServiceProxy  } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-warehouse-dialog',
  templateUrl: './create-warehouse-dialog.component.html',

})


export class CreateWarehouseDialogComponent extends AppComponentBase {
  saving = false;
  warehouse = new CreateWarehouseDto();
  users: UserForDropdownDto[] = [];

  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    private _warehouseService: WarehouseServiceProxy,
    public bsModalRef: BsModalRef,
    private _userService: UserServiceProxy,

  ) {
    super(injector);
  }
  ngOnInit(): void {
this.initUsers();
  }
  initUsers() {
    this._userService.getForDropdown().subscribe((result) => {
      this.users = result;
    });

  }

  save(): void {
    debugger
    console.log(this.warehouse)
    this.saving = true;
    this._warehouseService.
      create(
        this.warehouse
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {

         (response);
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });

  }

}
