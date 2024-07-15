import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StoreServiceProxy, UpdateStoreDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-store",
  templateUrl: "./edit-store.component.html",
})
export class EditStoreComponent extends AppComponentBase implements OnInit {
  saving = false;
  store = new UpdateStoreDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    public _storeService: StoreServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialStore();
  }

  initialStore() {
    this._storeService
      .getForEdit(this.id)
      .subscribe((result: UpdateStoreDto) => {
        this.store = result;
      });
  }

  save(): void {
    this.saving = true;
    this._storeService
      .update(this.store)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
