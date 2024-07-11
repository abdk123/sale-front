import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateTransferDto, TransferServiceProxy, UnitNameForDropdownDto, UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-transfer-dialog',
  templateUrl: './create-transfer-dialog.component.html',
})

export class CreateTransferDialogComponent extends AppComponentBase {
  saving = false;
  transfer = new CreateTransferDto();
  fromUnits: UnitNameForDropdownDto[] = [];
  ToUnits: UnitNameForDropdownDto[] = [];
  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _transferService: TransferServiceProxy,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initfromUnits();
  }

  initfromUnits() {
    this._unitService.getNameForDropdown().subscribe((result) => {
      this.fromUnits = result;
    });
  }

  save(): void {
    if (this.transfer.fromId == this.transfer.toId) {
      this.notify.error(this.l('ChooseDifferentUnits'));
    }
    else {
      this.saving = true;
      this._transferService.
        create(
          this.transfer
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

  onSelectFromUnit(event) {
    this._unitService.getAllRelatedUnits(event.target.value)
      .subscribe((result) => {
        this.ToUnits = result;
      });
  }
}
