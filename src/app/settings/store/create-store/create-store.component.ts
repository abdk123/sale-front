import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateStoreDto, StoreServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "create-store",
  templateUrl: "./create-store.component.html",
})
export class CreateStoreComponent extends AppComponentBase {
  saving = false;
  store = new CreateStoreDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _storeService: StoreServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true;
    this._storeService
      .create(this.store)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        response;
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
