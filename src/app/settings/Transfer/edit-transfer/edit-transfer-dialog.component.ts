import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { TransferServiceProxy, UpdateTransferDto, UnitServiceProxy, UnitNameForDropdownDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-transfer-dialog',
  templateUrl: './edit-transfer-dialog.component.html',
})

export class EditTransferDialogComponent extends AppComponentBase {
  saving = false;
  id:number;
  fromUnits: UnitNameForDropdownDto[] = [];
  ToUnits: UnitNameForDropdownDto[] = [];
  transfer = new UpdateTransferDto();
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
      this.initTransfer();
    });
  }

  initToUnits() {
    this._unitService.getAllRelatedUnits(this.transfer.fromId)
      .subscribe((result) => {
        this.ToUnits = result;
      });
  }

  initTransfer() {
    this._transferService.get(this.id).subscribe((result) => {
      this.transfer = result;
      this.initToUnits();
    });
  }

  save(): void {
    if (this.transfer.fromId == this.transfer.toId) {
      this.notify.error(this.l('ChooseDifferentUnits'));
    }
    else {
      this.saving = true;
      this._transferService.
        update(
          this.transfer
        )
        .pipe(
          finalize(() => {
            this.saving = false;
          })
        )
        .subscribe((response: any) => {
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
