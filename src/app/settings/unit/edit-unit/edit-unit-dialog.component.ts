import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SizeServiceProxy, UnitServiceProxy, UpdateSizeDto, UpdateUnitDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-unit-dialog",
  templateUrl: "./edit-unit-dialog.component.html",
})
export class EditUnitDialogComponent extends AppComponentBase {
  saving = false;
  id: number;
  unit = new UpdateSizeDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _sizeService: SizeServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initUnit();
  }

  initUnit() {
    this._sizeService.getForEdit(this.id).subscribe((result) => {
      this.unit = result;
    });
  }

  save(): void {
    debugger;
    this.saving = true;
    this._sizeService
      .update(this.unit)
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
