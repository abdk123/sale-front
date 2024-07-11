import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UserForDropdownDto, UpdateWarehouseDto, WarehouseServiceProxy, UserServiceProxy  } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-warehouse-dialog',
  templateUrl: './edit-warehouse-dialog.component.html',

})


export class EditWarehouseDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  warehouse = new UpdateWarehouseDto ();
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
    this.initWarehouse();
    this.initUsers();
  }
  initWarehouse() {
    this._warehouseService.get(this.id).subscribe((result) => {
      this.warehouse = result;
    });
  }
  initUsers() {
    this._userService.getForDropdown().subscribe((result) => {
      this.users = result;
    });

  }

  save(): void {
    this.saving = true;
    this._warehouseService.
      update(
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
